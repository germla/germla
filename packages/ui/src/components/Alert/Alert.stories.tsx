import type { Story } from "@ladle/react";
import type { HeroIcon } from "../typings";
import { Alert as Comp } from ".";

export const Alert: Story<{
    type: 0 | 1 | 2 | 3;
    icon?: HeroIcon
}> = ({ type, icon }) => (
    <Comp type={type} icon={icon}>
        This is an alert
    </Comp>
);

Alert.args = {
    type: 0,
};