import Seo from "@/components/SEO";
import Link from "next/link";

export default function PasswordResetSent() {
    return (
        <>
            <Seo title="Password successfully reset" siteName="Germla Auth" />
            <div className="overflow-hidden flex-col flex min-h-screen">
                <div className="flex-grow">
                    <section className="relative">
                        <div className="md:block blur-2xl opacity-70 -translate-x-1/2 -mt-36 -z-10 left-1/2 absolute pointer-events-none">
                            <svg className="max-w-none" xmlns="http://www.w3.org/2000/svg" width="1440" height="450"><defs><linearGradient id="a" x1="19.609%" x2="50%" y1="14.544%" y2="100%"><stop offset="0%" stop-color="#6366F1" /><stop offset="100%" stop-color="#6366F1" stop-opacity="0" /></linearGradient><linearGradient id="b" x1="50%" x2="19.609%" y1="100%" y2="14.544%"><stop offset="0%" stop-color="#A855F7" /><stop offset="100%" stop-color="#6366F1" stop-opacity="0" /></linearGradient></defs><g fill="none" fill-rule="evenodd"><path fill="url(#a)" d="m473 23 461 369-284 58z" /><path fill="url(#b)" d="m259 0 461 369-284 58z" /></g></svg>
                        </div>
                        <div className="sm:px-6 px-4 max-w-6xl mx-auto relative">
                            <div className="md:pt-40 md:pb-20 pt-32 pb-12">
                                <div className="text-center pb-12 max-w-3xl mx-auto">
                                    <div className="mb-5">
                                        <Link href="/" className="inline-flex">
                                            <div style={{
                                                background: "linear-gradient(#0f172a,#0f172a) padding-box,conic-gradient(#94a3b8,#334155 25%,#334155 75%,#94a3b8 100%) border-box"
                                            }} className="shadow-2xl border border-transparent rounded-2xl justify-center items-center w-16 h-16 flex relative before:bg-slate-800/30 before:rounded-2xl before:inset-0 before:absolute">
                                                <img src="https://preview.cruip.com/stellar/images/logo.svg" alt="logo" width={42} height={42} className="relative" />
                                            </div>
                                        </Link>
                                    </div>
                                    <h1 className="text-transparent from-slate-900/60 to-slate-900/60 via-slate-900 bg-clip-text bg-gradient-to-r font-extrabold leading-[1.2] tracking-tight text-4xl">
                                        Reset Password
                                    </h1>
                                    <p className="text-slate-500 mt-2">
                                        Your password has been successfully reset. You can now login with your new password.
                                    </p>
                                    <Link href="/login"
                                        className="shadow-sm max-w-xs mt-5 text-white text-sm bg-indigo-500 hover:bg-indigo-600 w-full px-4 py-[0.375rem] inline-flex items-center justify-center rounded-full border-transparent border font-medium transition-colors duration-150"
                                    >
                                        Login
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
