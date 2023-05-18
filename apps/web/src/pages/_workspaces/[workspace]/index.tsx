import GeneralSettings from "@/components/dashboard/GeneralSettings";
import DashboardLayout from "@/layouts/dashboard";
import prisma from "@/lib/prisma";
import { Site } from "@prisma/client";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface PathProps extends ParsedUrlQuery {
  site: string;
}

interface IndexProps {
  site: Site;
}

export async function getStaticPaths() {
  const [subdomains, customDomains] = await Promise.all([
    prisma.site.findMany({
      where: {
        subDomain: "demo",
      },
      select: {
        subDomain: true,
      },
    }),
    prisma.site.findMany({
      where: {
        NOT: {
          customDomain: null,
        },
        customDomain: "platformize.co",
      },
      select: {
        customDomain: true,
      },
    }),
  ]);

  const allPaths = [
    ...subdomains.map(({ subDomain }) => subDomain),
    ...customDomains.map(({ customDomain }) => customDomain),
  ].filter((path) => path) as Array<string>;

  return {
    paths: allPaths.map((path) => ({
      params: {
        site: path,
      },
    })),
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<IndexProps, PathProps> = async ({ params }) => {
  if (!params) throw new Error("No path parameters found");
  const { site } = params;
  let filter: {
    subDomain?: string;
    customDomain?: string;
  } = {
    subDomain: site,
  };

  if (site.includes(".")) {
    filter = {
      customDomain: site,
    };
  }

  const siteData = (await prisma.site.findUnique({
    where: filter,
    include: {
      owner: true,
    },
  })) as Site;

  if (!siteData) return { notFound: true, revalidate: 10 };

  return {
    props: {
      site: JSON.parse(JSON.stringify(siteData)),
    },
    revalidate: 3600,
  };
};

export default function Index({ site }: { site: Site }) {
  return (
    <DashboardLayout site={site}>
      <GeneralSettings site={site} />
    </DashboardLayout>
  )
}
