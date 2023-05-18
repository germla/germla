import type { Workspace as WorkspaceType } from "@prisma/client";
// import Site from "@/components/app/Site";
import type { GetServerSideProps } from "next/types";
import { unstable_getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]";
import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Seo from "@/components/SEO";
import { createWorkspace } from "@/lib/workspace";

interface AppProps {
  sites?: Array<WorkspaceType>;
}

export default function App(props: AppProps) {
  let [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      subDomain: "",
    },
  });

  const onSubmit = (data: {
    name: string;
    subDomain: string;
  }) => {
    createApp({
      name: data.name,
      subDomain: data.subDomain,
    });
    setIsCreateModalOpen(false);
  };
  return (
    <>
      <Seo title="App" />
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-slate-800 dark:border-slate-700">
          <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
            Choose your site
          </h5>
          {Array.isArray(props.sites) && props.sites.length > 0 ? (
            <ul className="my-4 space-y-2">
              {props.sites.map((site) => (
                <Site key={site.id} site={site} />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mb-3 dark:text-gray-400">
              You don&apos;t have any sites yet. Create one to get started.
            </p>
          )}
          <Transition appear show={isCreateModalOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setIsCreateModalOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl border border-white border-opacity-10 bg-gray-900 bg-opacity-80 backdrop-blur backdrop-filter focus-visible:outline-none focus-visible:ring p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-white"
                      >
                        Create a new Site
                      </Dialog.Title>
                      <div className="mt-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="mb-4">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-300"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              {...register("name", {
                                required: "Name is required",
                                minLength: {
                                  value: 3,
                                  message: "Name must be at least 3 characters",
                                },
                                maxLength: {
                                  value: 15,
                                  message: "Name must be at most 15 characters",
                                },
                              })}
                              id="name"
                              className="border mt-1 bg-transparent focus:outline-none block w-full p-1 border-gray-600 placeholder-gray-400 text-white focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.name && errors.name.message ? (
                              <p className="text-red-500 text-xs mt-0.5">
                                {errors.name.message}
                              </p>
                            ) : null}
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="subDomain"
                              className="block text-sm font-medium text-gray-300"
                            >
                              Subdomain
                            </label>
                            <div className="flex p-0 focus-within:border-indigo-500  items-center text-gray-400 border-gray-600 border">
                              <input
                                type="text"
                                id="subDomain"
                                {...register("subDomain", {
                                  required: "Subdomain is required",
                                  minLength: {
                                    value: 3,
                                    message: "Subdomain must be at least 3 characters",
                                  },
                                  maxLength: {
                                    value: 63,
                                    message: "Subdomain must be at most 63 characters",
                                  },
                                })}
                                className="bg-transparent focus:outline-none block w-full p-1 placeholder-gray-400 text-white"
                              />
                              <div className="px-3 py-1 bg-transparent border-l border-gray-600">
                                .resultism.com
                              </div>
                            </div>
                            {errors.subDomain ? (
                              <p className="text-red-500 text-xs mt-0.5">
                                {errors.subDomain.message}
                              </p>
                            ) : null}
                          </div>
                          <div className="mt-4 flex justify-center items-center align-middle">
                            <button
                              type="submit"
                              className="inline-flex align-middle justify-center rounded-md border border-transparent bg-transparent bg-gray-800 transition-colors duration-150 hover:bg-white hover:bg-opacity-20 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                              Create
                            </button>
                          </div>
                        </form>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          <div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center justify-center w-full px-4 py-2 text-base font-bold text-white bg-indigo-600 rounded-lg transition-colors duration-200 hover:bg-indigo-500"
            >
              Create a new site
            </button>
            <button className="flex items-center justify-center w-full px-4 py-2 mt-2 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const session = await unstable_getServerSession(
  //   context.req,
  //   context.res,
  //   authConfig
  // );
  // if (!session || !session.user) {
  //   return {
  //     redirect: {
  //       destination: "/auth/login",
  //       permanent: false,
  //     },
  //   };
  // }
  // TODO: Add Logic to get sites
  // const sites = [];
  return {
    props: {
      sites
    },
  };
};
