import { PropsWithChildren, ReactNode, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Sidebar } from "@germla/ui";
import Image from "next/image";
import type { Workspace } from "@germla/database/client";
import { Menu } from "@headlessui/react";
import FeedbackCreateModal from "@/components/dashboard/FeedbackCreateModal";
import Head from "next/head";
import BoardCreateModal from "@/components/dashboard/BoardCreateModal";
import { HomeIcon } from "@heroicons/react/24/outline";
import { SidebarItem, HeroIcon } from "@germla/ui/typings";

export default function DashboardLayout({
  children,
  workspace,
  name
}: PropsWithChildren<{
  workspace: Workspace,
  name: string
}>) {
  const sidebarItems: SidebarItem[] = [
    {
      label: "Home",
      icon: HomeIcon,
      path: "/"
    },
    // {
    //   label: "Boards",
    //   path: "/boards"
    // }
  ]
  const logo = (
    <div className="flex items-center justify-between">
      <Image src="/logo.svg" alt="Germla Logo" width={40} height={40} />
      <span className="text-xl font-bold">Germla</span>
    </div>
  )
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <>
      <Head>
        <title>{name} - {workspace.name}</title>
      </Head>
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
      <Sidebar items={sidebarItems} logo={logo}  />
      <div className="p-4 h-full sm:ml-64 dark:bg-[#1B1E21]">
      <FeedbackCreateModal workspace={workspace} /> 
      <BoardCreateModal workspace={workspace} />
      </div>
    </>
  );
}
