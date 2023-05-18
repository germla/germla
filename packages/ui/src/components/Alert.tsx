import { InformationCircleIcon, PencilIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { AlertProps } from "../typings";
import clsx from "clsx";

export const Alert = ({ children, icon, className, type }: AlertProps) => {
    const icons = {
        0: PencilIcon,
        1: CheckCircleIcon,
        2: XCircleIcon,
        3: InformationCircleIcon,
    }
    const colorClasses = [
        `border-blue-500/20 bg-blue-50/50 text-blue-900`,
        `border-emerald-500/20 bg-emerald-50/50 text-emerald-900`,
        `border-red-500/20 bg-red-50/50 text-red-900`,
        `border-yellow-500/20 bg-yellow-50/50 text-yellow-900`,
    ]
    const iconClasses = [
        'fill-blue-500',
        'fill-emerald-500',
        'fill-red-500',
        'fill-yellow-500',
    ]
    const Icon = icon ? icon : icons[type];
    const classes = clsx("my-6 flex gap-2.5 rounded-2xl border p-4 leading-6", className, colorClasses[type])
    return (
        <div className={classes}>
            <Icon className={`mt-1 h-5 w-5 flex-none stroke-white ${iconClasses[type]}`} />
            <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
                {children}
            </div>
        </div>
    )
}