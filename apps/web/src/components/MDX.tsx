import clsx from "clsx";

// TODO: Modify to differentiate from being detected
export { Alert } from "@germla/ui";
export function Row({ children }) {
    return (
        <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
            {children}
        </div>
    )
}

export function Col({ children, sticky = false }) {
    return (
        <div
            className={clsx(
                '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
                sticky && 'xl:sticky xl:top-24'
            )}
        >
            {children}
        </div>
    )
}

export function Properties({ children }) {
    return (
        <div className="my-6">
            <ul
                role="list"
                className="m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5"
            >
                {children}
            </ul>
        </div>
    )
}

export function Property({ name, type, children }) {
    return (
        <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
            <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <dt className="sr-only">Name</dt>
                <dd>
                    <code>{name}</code>
                </dd>
                <dt className="sr-only">Type</dt>
                <dd className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                    {type}
                </dd>
                <dt className="sr-only">Description</dt>
                <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
                    {children}
                </dd>
            </dl>
        </li>
    )
}
