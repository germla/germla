import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react"
import { cn } from "../utils";

const AvatarBase = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, forwardedRef) => (
    <AvatarPrimitive.Root
        ref={forwardedRef}
        className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden ", className)}
        {...props}
    />
))

const AvatarImage = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, forwardedRef) => (
    <AvatarPrimitive.Image
        ref={forwardedRef}
        className={cn("h-full w-full rounded-full", className)}
        {...props}
    />
))

const AvatarFallback = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, forwardedRef) => (
    <AvatarPrimitive.Fallback
        ref={forwardedRef}
        className={cn(
            "flex h-full w-full items-center justify-center rounded-full dark:bg-zinc-400 bg-zinc-500",
            className
        )}
        {...props}
    />
))

AvatarBase.displayName = AvatarPrimitive.Root.displayName;
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export const Avatar = Object.assign(AvatarBase, {
    Image: AvatarImage,
    Fallback: AvatarFallback,
});
