import type { ReactNode } from "react";

export type Sizes = "sm" | "md" | "lg";
export type Variants = "primary" | "secondary" | "tertiary";
export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;
export const enum Alert {
    NOTE = 0,
    SUCCESS = 1,
    ERROR = 2,
    WARNING = 3
};

export type SidebarItem = {
    label: string;
    icon?: HeroIcon;
    path: string;
    element?: ReactNode;
}

export interface SidebarProps {
    logo: JSX.Element;
    items?: SidebarItem[];
    actions?: ReactNode[];
    children?: ReactNode;
    className?: string;
    position?: string
}

export interface AlertProps {
    type: Alert;
    children: ReactNode;
    icon?: HeroIcon;
    className?: string;
}