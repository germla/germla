import { useForm } from "react-hook-form";
import Seo from "@/components/SEO";
import { api } from "@/lib/api";
import { useRouter } from "next/router";
import toast from 'react-hot-toast';
import { Fragment, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import { KeyIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";

export default function PasswordReset() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const formRef = useRef<HTMLFormElement>(null);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });
    const mutation = api.user.resetPassword.useMutation();

    const onSubmit = async (data: {
        password: string,
        confirmPassword: string
    }) => {
        if (!searchParams.get("token")) {
            return router.push("/forgot-password");
        }
        // @ts-ignore
        const formData = new FormData(formRef.current)
        const token = formData.get('cf-turnstile-response')
        if (!token) {
            return toast.error('Please complete the captcha')
        };
        mutation.mutate({
            token: searchParams.get("token"),
            password: data.password,
        }, {
            onError: (error) => {
                toast.error(error.message)
            },
            onSuccess: () => {
                router.push("/forgot-password/reset/success");
            }
        })
    };
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
                                        <div className="rounded-full inline-flex justify-center border-8 border-indigo-100 bg-indigo-200 items-center w-16 h-16 relative">
                                            <KeyIcon className="h-8 w-8 text-indigo-600" />
                                        </div>
                                    </div>
                                    <h1 className="text-transparent from-zinc-900/60 to-zinc-900/60 via-zinc-900 bg-clip-text bg-gradient-to-r font-extrabold leading-[1.2] tracking-tight text-4xl">
                                        Set a new password
                                    </h1>
                                    <p className="text-zinc-600 mt-3 tracking-tight text-sm">
                                        Enter your new password below.
                                    </p>
                                </div>
                                <div className="max-w-sm mx-auto">
                                    <form className="flex-col gap-3 flex" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                                        <div>
                                            <label htmlFor="password" className="text-zinc-600 font-medium text-sm block mb-1">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                className="w-full px-3 py-2 focus:outline-none focus:border-indigo-500 text-sm text-zinc-800 rounded-[0.25rem] border border-zinc-300 bg-white"
                                                {...register("password", {
                                                    required: "Password is required",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password must be at least 8 characters",
                                                    },
                                                    maxLength: {
                                                        value: 64,
                                                        message: "Password must be at most 64 characters",
                                                    },
                                                    pattern: {
                                                        value: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,65})"),
                                                        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                                                    },
                                                })}
                                            />
                                            {errors.password && (
                                                <p className="text-sm first-letter:uppercase text-red-500">{errors.password.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="confirmPassword" className="text-zinc-600 font-medium text-sm block mb-1">
                                                Confirm password
                                            </label>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                className="w-full px-3 py-2 focus:outline-none focus:border-indigo-500 text-sm text-zinc-800 rounded-[0.25rem] border border-zinc-300 bg-white"
                                                {...register("confirmPassword", {
                                                    required: "Confirm password is required",
                                                    validate: (value) => value === watch('password') || "Passwords do not match"
                                                })}
                                            />
                                            {errors.confirmPassword && (
                                                <p className="text-sm first-letter:uppercase text-red-500">{errors.confirmPassword.message}</p>
                                            )}
                                        </div>
                                        <Turnstile style={{
                                            justifyContent: 'center',
                                            display: 'flex',
                                            marginTop: '1.5rem',
                                            width: '100%'
                                        }} options={{ theme: 'light' }} siteKey='1x00000000000000000000AA' />
                                        <div className="mt-3">
                                            <button
                                                type="submit"
                                                className="shadow-sm text-white text-sm bg-indigo-500 hover:bg-indigo-600 w-full px-3 py-2.5 inline-flex items-center justify-center rounded-xl border-transparent border font-medium transition-colors duration-150"
                                            >
                                                Reset password
                                            </button>
                                            <div className="mt-6 text-center relative">
                                                <Link className="text-zinc-500 hover:text-zinc-600 transition-colors text-center gap-3 inline-flex items-center justify-center" href="/login">
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
