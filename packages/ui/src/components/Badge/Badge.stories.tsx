import type { Story } from "@ladle/react";
import { Badge as Comp } from ".";

export const Badge: Story<{
    label: string;
}> = ({ label }) => (
    <Comp>
        {label}
    </Comp>
);

Badge.args = {
    label: "Germla"
};