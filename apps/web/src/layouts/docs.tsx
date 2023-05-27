import { Sidebar } from "@germla/ui";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import type { TocEntry } from "remark-mdx-toc";
import { useEffect, useRef, useState } from "react";

type TOSType = {
    selector: string;
};

export const TOC = ({ selector }: TOSType) => {
    const [currentHeadingID, setCurrentHeadingID] = useState<
        string | undefined
    >();

    const listWrapperRef = useRef<HTMLDivElement>(null);

    const [headings, setHeadings] = useState<HTMLHeadElement[]>([]);
    useEffect(() => {
        const headingNodeList = document
            .querySelector(selector)!
            .querySelectorAll("h2,h3,h4,h5,h6") as NodeListOf<HTMLHeadElement>;

        if (headingNodeList.length) {
            const headingArray = Array.from(headingNodeList);
            headingArray.forEach((el) => {
                el.dataset.id = Math.round(Math.random() * 100000).toString();
            });
            setHeadings(headingArray);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // if (entry.intersectionRatio > 0.9) {
                    // console.log(entry.target.innerHTML, entry.intersectionRatio);
                    if (entry.isIntersecting && entry.intersectionRatio >= 1) {
                        setCurrentHeadingID((entry.target as HTMLHeadElement).dataset.id);
                    }
                });
            },
            {
                rootMargin: "0% 0% -60% 0%",
                threshold: 1,
            }
        );

        if (headings.length) {
            headings.forEach((s) => {
                observer.observe(s);
            });
        }

        return () => {
            return observer.disconnect();
        };
    }, [headings.length]);

    useEffect(() => {
        const element = listWrapperRef.current?.querySelector(
            'button[data-id="' + currentHeadingID + '"]'
        );

        if (currentHeadingID && element) {
            listWrapperRef.current?.scrollTo({
                top: (element as HTMLElement).offsetTop,
                behavior: "smooth",
            });
        }
    }, [currentHeadingID]);

    return (
        <div
            className="text-sm mt-0"
        >
            <div
                className={`absolute inset-x-0 rounded-b-2xl overflow-hidden transition-[height] duration-200 visible`}
            >
                <div className="p-4 h-full" ref={listWrapperRef}>
                    {headings.map((heading) => {
                        const tagLevel = heading.tagName.match(/(\d+)/)?.[0] || "1";
                        return (
                            <button
                                key={heading.dataset.id}
                                style={{ paddingLeft: +tagLevel * 7 + "px" }}
                                className={`flex w-full my-1 py-2 pr-2 rounded-md hover:text-neutral-600 font-medium ${currentHeadingID === heading.dataset.id
                                        ? "text-neutral-600"
                                        : "text-neutral-500"
                                    }`}
                                title={heading.innerHTML}
                                data-id={heading.dataset.id}
                                onClick={() => {
                                    window.history.replaceState(
                                        null,
                                        "",
                                        "#" + heading.id
                                    );
                                    window.scrollTo({
                                        top:
                                            heading.getBoundingClientRect().top + window.scrollY - 60,
                                        behavior: "smooth",
                                    });
                                }}
                            >
                                {heading.innerHTML}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default function DocsLayout({ children, toc }: { children: ReactNode, toc: TocEntry[] }) {
    const rightSidebarLogo = (
        <span className="text-zinc-500 mt-10">On this page</span>
    )
    return (
        <>
            <Sidebar logo={Logo} items={[]} className="!bg-zinc-50 border-r" />
            <div className="prose bg-zinc-50 p-4 h-screen sm:ml-64 lg:mr-64 prose-zinc max-w-none">
                {children}
                <footer className="not-prose mx-auto pt-8 relative border-t">
                    <span className="text-zinc-500 left-0">© {new Date().getFullYear()} Germla</span>
                </footer>
            </div>
            <div className="hidden lg:flex">
                <Sidebar position="right" logo={rightSidebarLogo} className="!bg-zinc-50 border-l">
                    <TOC selector=".prose" />
                </Sidebar>
            </div>
        </>
    )
}