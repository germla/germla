import { Site } from "@prisma/client";
import { useForm } from "react-hook-form";

export default function GeneralSettings({ site }: { site: Site }) {
    const { register } = useForm()
    return (
        <div className="flex items-start justify-around">
            <div>
                <label className="text-sm" htmlFor="name">
                    Name
                </label>
                <input className="block text-sm py-2 w-full px-4 rounded border border-zinc-700 focus:outline-none focus:border-indigo-500 dark:bg-zinc-800" name="name" id="name" />
            </div>
            <div>
                <label className="text-sm" htmlFor="name">
                    Name
                </label>
                <input className="block text-sm py-2 w-full px-4 rounded border border-zinc-700 focus:outline-none focus:border-indigo-500 dark:bg-zinc-800" name="name" id="name" />
            </div>
        </div>
    )
}