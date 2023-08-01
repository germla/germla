import type { Story } from "@ladle/react";
import type { SidebarItem } from "../typings";
import { Sidebar as Comp } from ".";

const Logo = (
    <div className="flex items-center gap-5">
        <img
            alt="logo"
            src="/logo.png"
            width={48}
            height={48}
        />
        <span className="text-2xl font-bold">Germla</span>
    </div>
)

const items: SidebarItem[] = [
    {
        label: "Home",
        path: "/"
    }
]

export const Sidebar: Story = () => (
    <div className="flex">
        <Comp logo={Logo} items={items} />
    </div>
);

