import Seo from "@/components/SEO";
import { api } from "@/lib/api";
import toast from 'react-hot-toast';
import Link from "next/link";
import { EnvelopeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import type { GetServerSidePropsContext } from "next/types";

export default function PasswordResetSent() {
    const searchParams = useSearchParams();
    const mutation = api.user.forgotPassword.useMutation();

    const onSubmit = async () => {            
        mutation.mutate({
            email: searchParams.get("email")
        }, {
            onError: (error) => {
                toast.error(error.message)
            },
            onSuccess: ({ remainingAttempts }) => {
                toast.success(`Password reset email sent. You have ${remainingAttempts} attempts remaining.`)
            }
        })
    };
    return (
        <>
            <Seo title="Forgot Password" siteName="Germla Auth" />
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
                                        Check your email
                                    </h1>
                                    <p className="text-zinc-600 mt-3 tracking-tight text-sm">
                                        We sent a password reset link to <span className="font-bold">{searchParams.get('email')}</span>
                                    </p>
                                    <button
                                        type="submit"
                                        className="shadow-sm mt-3 text-white text-sm bg-indigo-500 hover:bg-indigo-600 w-full max-w-md px-3 py-2.5 inline-flex items-center justify-center rounded-xl border-transparent border font-medium transition-colors duration-150"
                                    >
                                        <a target="_blank" href="mailto:">
                                            Open email app
                                        </a>
                                    </button>
                                    <div className="mt-5 text-center relative">
                                        <p className="text-zinc-600 cursor-pointer tracking-tight text-sm transition-colors text-center gap-1 inline-flex items-center justify-center">
                                            Didn't receive an email? <span onClick={() => onSubmit()} className="hover:text-indigo-600 text-indigo-500 transition-colors">Click to resend</span>
                                        </p>
                                    </div>
                                    <div className="mt-3 text-center relative">
                                        <Link className="text-zinc-500 hover:text-zinc-600 transition-colors text-center gap-3 inline-flex items-center justify-center" href="/login">
                                            <ArrowLeftIcon className="h-5 w-5 inline-flex mr-1" />
                                            Back to login
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

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