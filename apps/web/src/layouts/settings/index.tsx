import {PropsWithChildren, ReactNode, useState} from "react";
import MobileSidebar from "./MobileSidebar";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Image from "next/image";
import type { Workspace } from "@prisma/client";
import { Menu } from "@headlessui/react";

export default function SettingsLayout({
  children,
  workspace
}: PropsWithChildren<{
  workspace: Workspace
}>) {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <>
      <main className="flex h-screen flex-col">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar workspace={workspace} />
          <div className="flex flex-1 flex-col">
            <MobileSidebar open={openSidebar} setOpen={setOpenSidebar} />
            <div className="flex gap-3 pb-3 dark:bg-[#0F1215] lg:hidden backdrop-blur-sm border-b border-white/10 flex-row items-center h-16 bg-white pt-4 pl-4 text-lg">
              <button type="button" onClick={() => setOpenSidebar(!openSidebar)} className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5" aria-label="Toggle navigation">
                {openSidebar ? (
                  <svg viewBox="0 0 10 9" fill="none" strokeLinecap="round" aria-hidden="true" className="w-2.5 stroke-zinc-900 dark:stroke-white"><path d="m1.5 1 7 7M8.5 1l-7 7"></path></svg>
                ) : (
                  <svg viewBox="0 0 10 9" fill="none" strokeLinecap="round" aria-hidden="true" className="w-2.5 stroke-zinc-900 dark:stroke-white"><path d="M.5 1h9M.5 8h9M.5 4.5h9"></path></svg>
                )}
              </button>
              <div className="flex gap-2 items-center">
                <Menu>
                  <Menu.Button className={"relative inline-block text-left"}>
                    {/* <img src={`/api/avatar/${site.id}.svg`} /> */}
                  </Menu.Button>
                </Menu>
              </div>
            </div>
            <div className="paragraph dark:bg-[#1B1E21] flex flex-1 grow flex-col overflow-y-auto p-6">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
