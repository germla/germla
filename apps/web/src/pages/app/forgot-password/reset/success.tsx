import Seo from "@/components/SEO";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function PasswordResetSuccess() {
    return (
        <>
            <Seo title="Reset Password" siteName="Germla Auth" />
            <div className="overflow-hidden flex-col flex min-h-screen">
                <div className="flex-grow">
                    <section className="relative">
                        <div className="sm:px-6 px-4 max-w-6xl mx-auto relative">
                            <div className="md:pt-30 md:pb-20 pt-32 pb-12">
                                <div className="text-center pb-12 max-w-3xl mx-auto">
                                    <div className="mb-5">
                                        <div className="rounded-full inline-flex justify-center border-8 border-green-100 bg-green-200 items-center w-16 h-16 relative">
                                            <CheckIcon className="h-8 w-8 text-green-600" />
                                        </div>
                                    </div>
                                    <h1 className="text-transparent from-zinc-900/60 to-zinc-900/60 via-zinc-900 bg-clip-text bg-gradient-to-r font-extrabold leading-[1.2] tracking-tight text-4xl">
                                        Password reset successful
                                    </h1>
                                    <p className="text-zinc-600 mt-3 tracking-tight text-sm">
                                        Your password has been reset. You can now login with your new password.
                                    </p>
                                    <Link
                                        href="/login"
                                        className="shadow-sm mt-3 text-white text-sm bg-indigo-500 hover:bg-indigo-600 w-full max-w-md px-3 py-2.5 inline-flex items-center justify-center rounded-xl border-transparent border font-medium transition-colors duration-150"
                                    >
                                        Continue to login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
