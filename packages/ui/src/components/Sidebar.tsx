import type { SidebarProps } from "../typings";
import Link from "next/link"
import clsx from "clsx";


export function Sidebar({ logo, items, actions, className, position, children }: SidebarProps) {
    const classes = clsx(`fixed top-0 ${position === "right" ? "right-0" : "left-0"}  z-40 w-64 h-screen bg-slate-50 dark:bg-black transition-transform -translate-x-full sm:translate-x-0`, className)
    return (
        <aside className={classes}>
            <div className="flex items-center align-middle justify-between p-4">
                {logo}
            </div>
            {actions ? (
                <div className="px-3 py-4 space-y-3">
                    {actions.map((action, i) => (
                        <div key={i}>{action}</div>
                    ))}
                </div>
            ) : null}
            <div className="h-full overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    {children ? children : items?.map((item, i) => (
                        <li key={i}>
                            <Link href={item.path} className="flex items-center p-2 mx-3 text-slate-900 rounded-lg dark:text-white hover:bg-white/20 transition-colors ease-in-out duration-75">
                                {item.icon && <item.icon className="w-5 h-5" />}
                                <span className="flex-1 ml-3 whitespace-nowrap">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
