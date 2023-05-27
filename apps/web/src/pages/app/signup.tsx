/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Turnstile } from '@marsidev/react-turnstile'
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Seo from "@/components/SEO";
import { api } from "@/lib/api";

const SignUp: NextPage = () => {
  const router = useRouter();
  const formRef = useRef(null)
  const [signUpButtonDisabled, setSignUpButtonDisabled] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const mutation = api.user.createUser.useMutation();

  const onSubmit = (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setSignUpButtonDisabled(true)
    const formData = new FormData(formRef.current)
    const token = formData.get('cf-turnstile-response')
    if (!token) {
      setSignUpButtonDisabled(false)
      return toast.error('Please complete the captcha')
    }
    mutation.mutate(data, {
        onSuccess: () => {
            toast.success('Account created successfully')
            router.push('/login')
        },
        onError: (error) => {
            setSignUpButtonDisabled(false)
            toast.error(error.message)
        }
    })
  };
  return (
    <div>
      <Seo title="Sign Up" siteName="Germla Auth" />
      <div className="ml-2 px-5 py-6">
        <div className="flex gap-2">
          <img
            src="/logo.png"
            width={36}
            height={36}
            alt="gradient blur"
          />
          <h1 className="font-heading">Resultism</h1>
        </div>
      </div>
      <div className="px-10 py-10 mx-auto sm:max-w-xl md:max-w-xl lg:max-w-screen-xl">
        <div className="grid gap-4.5 row-gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="max-w-xl mb-6">
              <h2 className="max-w-lg mb-2 font-primary text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                Create an account
              </h2>
              <p className="text-md max-w-md text-gray-700">
                Listen to your customers and deliver a product that will delight
                them.
              </p>
            </div>
            <div className="max-w-sm">
              <button
                type="button"
                onClick={() => signIn("google")}
                className="py-2 px-5 mr-2 w-full mb-2 text-sm bg-zinc-100 hover:bg-white font-semibold focus:outline-none rounded-lg border text-zinc-800 transition-colors duration-200 border-zinc-300 focus:ring-2 focus:ring-zinc-200"
              >
                <FcGoogle className="inline-block w-6 h-6 mr-2" />
                Sign up with Google
              </button>
              <div className="relative flex -mt-1 items-center">
                <div className="flex-grow border-t border-zinc-400"></div>
                <span className="flex-shrink mx-4 italic text-zinc-500">OR</span>
                <div className="flex-grow border-t border-zinc-400"></div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              ref={formRef}
              className="gap-1 flex-col mt-1 flex max-w-sm"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-zinc-500"
                >
                  Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Name must be at most 20 characters",
                    },
                  })}
                  className="border mt-1 text-zinc-600 hover:border-zinc-400 duration-200 transition-colors text-sm rounded-lg focus:outline-none focus:border-indigo-500 block w-full p-2.5 bg-zinc-100 border-zinc-300 focus:ring-indigo-500"
                />
                <p className="text-red-500 mt-1 text-xs first-letter:uppercase">
                  {errors.name?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-zinc-500"
                >
                  Email
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="border mt-1 text-zinc-600 hover:border-zinc-400 duration-200 transition-colors text-sm rounded-lg focus:outline-none focus:border-indigo-500 block w-full p-2.5 bg-zinc-100 border-zinc-300 focus:ring-indigo-500"
                />
                <p className="text-red-500 mt-1 text-xs first-letter:uppercase">
                  {errors.email?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-zinc-500"
                >
                  Password
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
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
                  className="border mt-1 text-zinc-600 hover:border-zinc-400 duration-200 transition-colors text-sm rounded-lg focus:outline-none focus:border-indigo-500 block w-full p-2.5 bg-zinc-100 border-zinc-300 focus:ring-indigo-500"
                />
                <p className="text-red-500 mt-1 text-xs first-letter:uppercase">
                  {errors.password?.message}
                </p>
              </div>
              <div className="mt-1 mb-1.5">
                <span className="text-sm font-medium text-gray-900">
                  By creating an account, you agree to our{" "}
                  <Link className="text-indigo-500" href="/terms">
                    Terms of Service
                  </Link>
                  {" "} and{" "}
                  <Link className="text-indigo-500" href="/privacy">
                    Privacy Policy
                  </Link>
                </span>
              </div>
              <Turnstile style={{
                width: '100%',
                justifyContent: 'center',
                display: 'flex',
              }} options={{ theme: 'light' }} siteKey='1x00000000000000000000AA' />              <button
                type="submit"
                disabled={signUpButtonDisabled}
                className="py-2.5 px-5 mr-2 disabled:bg-opacity-40 disabled:border-opacity-40 disabled:hover:cursor-not-allowed mt-1 font-semibold w-full mb-3 text-sm focus:outline-none rounded-lg border focus:z-10 bg-indigo-600 text-indigo-100 transition-colors duration-200 border-indigo-700 hover:text-white hover:bg-indigo-700"
              >
                Create account
              </button>
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium text-gray-900">
                  Already have an account?
                </span>
                <Link className="ml-1 text-sm font-medium text-indigo-500" href="/login">
                  Login
                </Link>
              </div>
            </form>
          </div>
          <div>
            <img
              className="object-cover w-full h-full rounded shadow-lg"
              src={
                "https://images.unsplash.com/photo-1560131914-2e469a0e8607?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
