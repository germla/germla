import { Dispatch, Fragment, SetStateAction } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function MobileSidebar({ open, setOpen }: Props) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 overflow-hidden"
        open={open}
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 transition-opacity" />
          </Transition.Child>
          <div className="fixed mt-16 inset-y-0 left-0 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="-translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="-translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <div className="h-full flex flex-col py-6 dark:bg-[#0F1215] shadow-xl overflow-y-scroll">
                  <div className="relative flex-1 px-4 sm:px-6">
                    <span className="text-xs font-semibold uppercase text-zinc-900 dark:text-white">Application</span>
                    <div className="py-1 px-1.5">
                      <Link className="block outline-none text-sm hover:bg-zinc-800/2.5 p-1.5 rounded-md ease-in-out transition-colors duration-150 dark:hover:bg-white/5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/test">
                        Settings
                      </Link>
                      <Link className="block text-sm hover:bg-zinc-800/2.5 p-1.5 rounded-md ease-in-out transition-colors duration-150 dark:hover:bg-white/5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/test">
                        Settings
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}