import { useForm } from "react-hook-form";
import Seo from "@/components/SEO";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (credentials: {
    email: string,
    password: string
  }) => {
    signIn("credentials", {
      ...credentials
    })
  };
  return (
    <>
      <Seo title="Login" siteName="Germla Auth" />
      <div className="overflow-hidden flex-col flex min-h-screen">
        <div className="flex-grow">
          <section className="relative">
            <div className="md:block blur-2xl opacity-70 -tranzinc-x-1/2 -mt-36 -z-10 left-1/2 absolute pointer-events-none">
              <svg className="max-w-none" xmlns="http://www.w3.org/2000/svg" width="1440" height="450"><defs><linearGradient id="a" x1="19.609%" x2="50%" y1="14.544%" y2="100%"><stop offset="0%" stop-color="#6366F1" /><stop offset="100%" stop-color="#6366F1" stop-opacity="0" /></linearGradient><linearGradient id="b" x1="50%" x2="19.609%" y1="100%" y2="14.544%"><stop offset="0%" stop-color="#A855F7" /><stop offset="100%" stop-color="#6366F1" stop-opacity="0" /></linearGradient></defs><g fill="none" fill-rule="evenodd"><path fill="url(#a)" d="m473 23 461 369-284 58z" /><path fill="url(#b)" d="m259 0 461 369-284 58z" /></g></svg>
            </div>
            <div className="sm:px-6 px-4 max-w-6xl mx-auto relative">
              <div className="md:pt-40 md:pb-20 pt-32 pb-12">
                <div className="text-center pb-12 max-w-3xl mx-auto">
                  <div className="mb-5">
                    <Link href="/" className="inline-flex">
                      <div style={{
                        background: "linear-gradient(#0f172a,#0f172a) padding-box,conic-gradient(#94a3b8,#334155 25%,#334155 75%,#94a3b8 100%) border-box"
                      }} className="shadow-2xl border border-transparent rounded-2xl justify-center items-center w-16 h-16 flex relative before:bg-zinc-800/30 before:rounded-2xl before:inset-0 before:absolute">
                        <img src="https://preview.cruip.com/stellar/images/logo.svg" alt="logo" width={42} height={42} className="relative" />
                      </div>
                    </Link>
                  </div>
                  <h1 className="text-transparent from-zinc-900/60 to-zinc-900/60 via-zinc-900 bg-clip-text bg-gradient-to-r font-extrabold leading-[1.2] tracking-tight text-4xl">
                    Sign in to your account
                  </h1>
                </div>
                <div className="max-w-sm mx-auto">
                  <form className="space-y-3.5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label htmlFor="email" className="text-zinc-600 font-medium text-sm block mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-[0.375rem] focus:outline-none focus:border-indigo-500 text-sm text-zinc-800 rounded-[0.25rem] border border-transparent bg-white"
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
                    <div>
                      <label htmlFor="password" className="text-zinc-600 font-medium text-sm block mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-[0.375rem] focus:outline-none focus:border-indigo-500 text-sm text-zinc-800 rounded-[0.25rem] border border-transparent bg-white"
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
                      <button
                        type="submit"
                        className="shadow-sm text-white text-sm bg-indigo-500 hover:bg-indigo-600 w-full px-4 py-[0.375rem] inline-flex items-center justify-center rounded-full border-transparent border font-medium transition-colors duration-150"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <div className="text-center mt-4">
                    <div className="text-sm text-zinc-700">
                      Don't have an account?{" "}
                      <Link href="/signup" className="text-indigo-500 hover:text-indigo-600">
                        Sign up
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-zinc-300 mr-3" />
                    <div className="italic text-zinc-400 text-sm">or</div>
                    <div className="flex-grow border-t border-zinc-300 ml-3" />
                  </div>
                  <div className="flex">
                    <button onClick={() => signIn("google")} className="bg-white w-full h-[2.25rem] relative px-4 py-[0.375rem] inline-flex items-center justify-center rounded-full border border-transparent font-medium text-sm">
                      <FcGoogle className="text-white w-5 h-5 mr-2" />
                      <span className="text-zinc-800">Sign in with Google</span>
                    </button>
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
