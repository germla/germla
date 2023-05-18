import { Menu } from "@headlessui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaHome, FaInbox } from "react-icons/fa";
import { MdList, MdSettings, MdPeople } from 'react-icons/md';
import { BsFiles } from "react-icons/bs";
import { BiAnalyse } from 'react-icons/bi';
import { Workspace } from "@prisma/client";
import { useRouter } from "next/router";

export default function Sidebar({ workspace }: { workspace: Workspace }) {
  console.log(workspace);
  const router = useRouter();
  return (
    <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:px-6 lg:pt-4 lg:pb-8 border-r-2 dark:bg-[#0F1215] bg-white border-zinc-900/10 dark:border-white/5 xl:w-60">
      <div className="hidden lg:flex">
        <div className="flex items-center flex-shrink-0">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="w-48 py-0.5 pl-1 pr-10 text-left border-none white-btn  rounded-md shadow-none dark:bg-transparent hover:dark:bg-gray-750/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-blue-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"></Menu.Button>
            </div>
            <div className="flex justify-around items-center">
              {/* <Image src={"/api/avatar/"+site.id+".svg"} className="rounded-full" width={32} height={32} alt="Logo" /> */}
              {/* <h1>{site.name}</h1> */}
            </div>

            <Menu.Items className={"mt-5"} static>
              <Menu.Item>
                {({ active }) => (
                  <Link className="block text-sm hover:bg-zinc-800/2.5 p-1.5 rounded-md ease-in-out items-center transition-colors duration-150 dark:hover:bg-white/5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/dashboard/getting-started">
                    General
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link className="block text-sm hover:bg-zinc-800/2.5 p-1.5 rounded-md ease-in-out items-center transition-colors duration-150 dark:hover:bg-white/5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/dashboard/getting-started">
                    <FaInbox className="inline-block w-4 h-4 mr-2" />
                    Inbox
                  </Link>
                )}
              </Menu.Item>
              <span className="text-xs font-semibold uppercase text-zinc-900 dark:text-white">Feedback Management</span>
              <div className="py-1 px-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link className="block text-sm hover:bg-zinc-800/2.5 p-1.5 rounded-md ease-in-out transition-colors duration-150 dark:hover:bg-white/5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/dashboard/feedback-management/requests">
                      <MdList className="inline-block w-4 h-4 mr-2" />
                      All Requests
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link className="block text-sm hover:bg-zinc-800/2.5 p-1.5 rounded-md ease-in-out transition-colors duration-150 dark:hover:bg-white/5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/dashboard/feedback-management/boards">
                      <BsFiles className="inline-block w-4 h-4 mr-2" />
                      Boards
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link className="block text-sm hover:bg-zinc-800/2.5 p-1.5 rounded-md ease-in-out transition-colors duration-150 dark:hover:bg-white/5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/dashboard/feedback-management/analysis">
                      <BiAnalyse className="inline-block w-4 h-4 mr-2" />
                      Analysis
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
            <Menu.Items className={"mt-5"} static>
              <span className="text-xs font-semibold uppercase text-zinc-900 dark:text-white">Organization</span>
              <div className="py-1 px-1.5">
                <Menu.Item>
                  {({ active }) => (
                    <Link className="block text-sm hover:bg-zinc-800/2.5 p-1.5 rounded-md ease-in-out transition-colors duration-150 dark:hover:bg-white/5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/dashboard/settings">
                      <MdPeople className="inline-block w-4 h-4 mr-2" />
                      Members
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link className="block text-sm hover:bg-zinc-800/2.5 p-1.5 rounded-md ease-in-out transition-colors duration-150 dark:hover:bg-white/5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/dashboard/settings">
                      <MdSettings className="inline-block w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </div>
  );
}
