import { useForm } from "react-hook-form";
import Seo from "@/components/SEO";
import { api } from "@/lib/api";
import { useRouter } from "next/router";
import toast from 'react-hot-toast';
import { useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import { KeyIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function PasswordReset() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            email: "",
        },
    });
    const mutation = api.user.forgotPassword.useMutation();

    const onSubmit = async (data: {
        email: string
    }) => {
        // @ts-ignore
        const formData = new FormData(formRef.current)
        const token = formData.get('cf-turnstile-response')
        if (!token) {
            return toast.error('Please complete the captcha')
        };
        mutation.mutate(data, {
            onError: (error) => {
                toast.error(error.message)
            },
            onSuccess: () => {
                router.push('/forgot-password/email-sent')
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
                                        <div className="rounded-full inline-flex justify-center border-8 border-indigo-200 bg-indigo-300 items-center w-16 h-16 relative">
                                            <KeyIcon className="h-8 w-8 text-indigo-700" />
                                        </div>
                                    </div>
                                    <h1 className="text-transparent from-zinc-900/60 to-zinc-900/60 via-zinc-900 bg-clip-text bg-gradient-to-r font-extrabold leading-[1.2] tracking-tight text-4xl">
                                        Forgot Password?
                                    </h1>
                                    <p className="text-zinc-600 mt-3 tracking-tight text-sm">
                                        No worries! Enter your email and we will send you a password reset link.
                                    </p>
                                </div>
                                <div className="max-w-sm mx-auto">
                                    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                                        <div>
                                            <label htmlFor="email" className="text-zinc-600 font-medium text-sm block mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="w-full px-3 py-2 focus:outline-none focus:border-indigo-500 text-sm text-zinc-800 rounded-[0.25rem] border border-zinc-300 bg-white"
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address",
                                                    },
                                                })}
                                            />
                                            {errors.email && (
                                                <p className="text-sm first-letter:uppercase text-red-500">{errors.email.message}</p>
                                            )}
                                        </div>
                                        <Turnstile style={{
                                            justifyContent: 'center',
                                            display: 'flex',
                                            marginTop: '1.5rem',
                                            width: '100%'
                                        }} options={{ theme: 'light' }} siteKey='1x00000000000000000000AA' />
                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                className="shadow-sm text-white text-sm bg-indigo-500 hover:bg-indigo-600 w-full px-3 py-2.5 inline-flex items-center justify-center rounded-xl border-transparent border font-medium transition-colors duration-150"
                                            >
                                                Send password reset email
                                            </button>
                                            <div className="mt-6 text-center relative">
                                                <Link className="text-indigo-500 hover:text-indigo-600 transition-colors text-center gap-3 inline-flex items-center justify-center" href="/login">
                                                    <ArrowLeftIcon className="h-5 w-5 inline-flex mr-1" />
                                                    Back to login
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}