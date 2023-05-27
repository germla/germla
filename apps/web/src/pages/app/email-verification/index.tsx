import Seo from "@/components/SEO";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import type { GetServerSidePropsContext } from "next/types";
import { useEffect } from "react";

export default function PasswordResetSent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    useEffect(() => {
        if (token) {
          signIn("token", {
            token: token,
            callbackUrl: `${window.location.host}/login`,
          });
        }
      }, [token]);
    return (
        <>
            <Seo title="Email Verification" siteName="Germla Auth" />
            <div className="overflow-hidden flex-col flex min-h-screen">
                <div className="flex-grow">
                    <section className="relative">
                        <div className="sm:px-6 px-4 max-w-6xl mx-auto relative">
                            <div className="md:pt-30 md:pb-20 pt-32 pb-12">
                                <div className="text-center pb-12 max-w-3xl mx-auto">
                                    <div className="mb-5">
                                        <div className="rounded-full inline-flex justify-center border-8 border-indigo-100 bg-indigo-200 items-center w-16 h-16 relative">
                                            <EnvelopeIcon className="h-8 w-8 text-indigo-600" />
                                        </div>
                                    </div>
                                    <h1 className="text-transparent from-zinc-900/60 to-zinc-900/60 via-zinc-900 bg-clip-text bg-gradient-to-r font-extrabold leading-[1.2] tracking-tight text-4xl">
                                        Verifying...
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
    if (!query.email) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    return {
        props: {}, 
    }
}
