import Layout from "@/layouts/dashboard";
import type { Workspace } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useState } from "react";

import { authConfig } from "../api/auth/[...nextauth]";

export default function Test(workspace: Workspace) {
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <h1>Kid</h1>
    </Layout>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerSession(ctx.req, ctx.res, authConfig);
  const app = await prisma?.workspace.create({
    data: {
      owner: {
        connect: {
          email: session?.user?.email,
        },
      },
      name: "Testing",
      subDomain: "hui",
    },
  });
  return {
    props: {
      app,
    },
  };
}
