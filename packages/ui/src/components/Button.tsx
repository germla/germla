"use client";

import * as React from "react";
import clsx from "clsx";
import { Sizes, Variants } from "../typings";
import '../styles.css';


export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    leftIcon?: Element;
    rightIcon?: Element;
    disabled?: boolean;
    loading?: boolean;
    variant?: Variants;
    size?: Sizes;
    type?: "button" | "submit" | "reset";
    rounded?: "none" | "sm" | "md" | "lg" | "full";
    color?: string;
    href?: string;
}

const padding = {
    "sm": "px-2.5 py-1.5 text-xs",
    "md": "px-3 py-2 text-sm",
    "lg": "px-5 py-3 text-md",
}

const Loading = ({ size }: { size: Sizes }) => {
    const classes = clsx(
        "loading",
        [
            size === "sm" && "w-6 h-6",
            size === "md" && "w-7 h-7",
            size === "lg" && "w-10 h-10",
        ],
        padding[size]
    )
    return (
        <span className={classes} />
    )
}

export const Button = ({
    variant = "primary",
    size = "md",
    rounded = "md",
    type = "button",
    color = "indigo",
    disabled,
    className,
    loading,
    children,
    ...props
}: ButtonProps) => {
    const classes = clsx(
        `inline-flex gap-3 items-center transition-colors duration-250 transition focus:outline-none justify-center border border-transparent rounded-md font-semibold text-white focus:outline-none`,
        [
            variant === "primary" && `bg-indigo-500 hover:bg-indigo-600 focus:ring-${color}-500 rounded-${rounded} disabled:opacity-50 disabled:hover:bg-indigo-500 disabled:cursor-not-allowed`,
            variant === "secondary" && "bg-zinc-500 hover:bg-zinc-600 focus:ring-gray-500",
            variant === "tertiary" && "bg-transparent border-indigo-500 text-indigo-500 hover:bg-indigo-600 hover:text-white focus:ring-gray-500",
            size === "sm" && "px-2.5 py-1.5 text-xs",
            size === "md" && "px-3 py-2 text-sm",
            size === "lg" && "px-5 py-3 text-md",
        ],
        loading && "cursor-wait",
        className
    );
    console.log(size)

    return (
        <button type={type} disabled={disabled} className={classes} {...props}>
            {loading && <Loading size={size} />}
            {children}
        </button>
    );
};
