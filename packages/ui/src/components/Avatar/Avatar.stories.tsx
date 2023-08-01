import type { Story } from "@ladle/react";
import { Avatar as Comp } from "./Avatar";

export const Avatar: Story<{
    src: string;
    fallback?: string;
}> = ({ src, fallback }) => (
    <Comp>
        <Comp.Image src={src} />
        {fallback ? <Comp.Fallback>{fallback}</Comp.Fallback> : null}
    </Comp>
);

Avatar.args = {
    src: "https://avatars.githubusercontent.com/u/100000?s=460&u=1e7c0c0b6b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2&v=4",
    fallback: "G",
};

export const AvatarFallback: Story<{
    fallback: string;
}> = ({ fallback }) => (
    <Comp>
        <Comp.Image src="https://something.1232.12" />
        <Comp.Fallback>{fallback}</Comp.Fallback>
    </Comp>
);

AvatarFallback.args = {
    fallback: "G",
};