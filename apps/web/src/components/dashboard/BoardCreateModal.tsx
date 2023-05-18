import { Transition, Dialog, Listbox } from "@headlessui/react";
import { Fragment, useRef, useState, useEffect, useReducer, type ChangeEvent, type FormEvent } from "react";
import { useModalStore } from "@/lib/modal";
import type { Board, Visibility, Workspace } from "@prisma/client";
import toast from "react-hot-toast";
import { createBoard } from "@/lib/board";

export default function BoardCreateModal({ workspace }: { workspace: Workspace }) {
    const { board, toggleModal } = useModalStore();
    const nameRef = useRef<HTMLInputElement | null>(null);
    const visibilities = [
        { name: "Public", value: "PUBLIC" },
        { name: "Private", value: "PRIVATE" },
    ]
    const [selectedVisibility, setSelectedVisibility] = useState<{ name: string; value: Visibility } | null>(null);
    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedVisibility) return toast.error("Please select a visibility", {
            className: "bg-white dark:bg-slate-900 z-50 dark:text-white",
        });
        if (!nameRef.current?.value) return toast.error("Please enter a name for the board.", {
            className: "bg-white dark:bg-slate-900 z-50 dark:text-white",
        });
        toast.promise(createBoard(workspace.id, nameRef.current?.value, selectedVisibility.value), {
            loading: "Creating board...",
            success: () => {
                toggleModal("board");
                return "Successfully created board";
            },
            error: () => {
                toggleModal("board");
                return "Failed to create board";
            }
        }, {
            className: "bg-white dark:bg-slate-900 z-50 dark:text-white",
        })
    };
    return (
        <Transition appear show={board} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => toggleModal("board")}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-30" />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-950  p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg text-center dark:text-white font-medium leading-6 text-gray-900"
                                >
                                    Create Board
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form onSubmit={onFormSubmit} className="space-y-6">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block mb-2 text-sm font-medium text-slate-500 dark:text-white"                                            >
                                                Name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    ref={nameRef}
                                                    className="border text-gray-900 text-sm rounded-lg focus:outline-none dark:border-slate-600 dark:focus:border-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-slate-800 bg-white border-slate-200 placeholder-slate-400 dark:text-white focus:ring-indigo-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="visibility"
                                                className="block mb-2 text-sm font-medium text-slate-500 dark:text-white"                                            >
                                                Visibility
                                            </label>
                                            <div className="mt-1 relative">
                                                <Listbox name="board" value={selectedVisibility} onChange={setSelectedVisibility}>
                                                    <Listbox.Button className="relative w-full border text-gray-900 text-sm rounded-lg focus:outline-none dark:border-slate-600 dark:focus:border-indigo-500 focus:border-indigo-500 block p-2.5 dark:bg-slate-800 bg-white border-slate-200 placeholder-slate-400 dark:text-white focus:ring-indigo-500">
                                                        <span className="block text-start">
                                                            {selectedVisibility?.name || "Select a visibility type"}
                                                        </span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <svg
                                                                className="h-5 w-5 text-gray-400"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5 8a1 1 0 011.707 0L10 11.293l3.293-3.294A1 1 0 1115 9.707l-4 4a1 1 0 01-1.414 0l-4-4A1 1 0 015 8z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in-out duration-200"
                                                        enterFrom="opacity-0 scale-95"
                                                        enterTo="opacity-100 scale-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {visibilities.map((visibility) => (
                                                                <Listbox.Option
                                                                    key={visibility.name}
                                                                    className={({ active }) =>
                                                                        `${active
                                                                            ? "text-white bg-indigo-600"
                                                                            : "text-gray-900"
                                                                        }
                                                                    cursor-default select-none relative py-2 pl-3 pr-9 dark:text-white`
                                                                    }
                                                                    value={visibility}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                                <span
                                                                                    className={`${selected
                                                                                        ? "font-semibold"
                                                                                        : "font-normal"
                                                                                        } block truncate`}
                                                                                >
                                                                                    {visibility.name}
                                                                                </span>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </Listbox>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-center">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center items-center rounded-sm border border-transparent shadow-sm transition-colors bg-indigo-500 px-4 py-2 text-sm font-medium text-white duration-150 hover:bg-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
    )
}