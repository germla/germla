/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["../ui/src/components/**/*.{tsx,jsx}", "../../apps/web/src/**/*.{jsx,tsx,js,mdx}"],
    darkMode: ["class", '[data-theme="dark"]'],
    theme: {
        extend: {
            fontFamily: {
                body: ["Inter"],
                primary: ["Rubik"],
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        h1: {
                            color: "var(--tw-prose-headings)",
                            fontWeight: "700",
                            fontSize: theme("fontSize.2xl")[0],
                            ...theme("fontSize.2xl")[1],
                            marginBottom: theme("spacing.2"),
                        },
                        h2: {
                            color: "var(--tw-prose-headings)",
                            fontWeight: "600",
                            fontSize: theme("fontSize.lg")[0],
                            ...theme("fontSize.lg")[1],
                            marginTop: theme("spacing.16"),
                            marginBottom: theme("spacing.2"),
                        },
                        h3: {
                            color: "var(--tw-prose-headings)",
                            fontSize: theme("fontSize.base")[0],
                            ...theme("fontSize.base")[1],
                            fontWeight: "600",
                            marginTop: theme("spacing.10"),
                            marginBottom: theme("spacing.2"),
                        },
                    },
                },
            }),
            colors: {
                primary: {
                    50: "hsl(249, 100%, 97%)",
                    100: "hsl(254, 100%, 95%)",
                    200: "hsl(253, 100%, 90%)",
                    300: "hsl(256, 100%, 83%)",
                    400: "hsl(258, 100%, 73%)",
                    500: "hsl(262, 100%, 62%)",
                    600: "hsl(265, 100%, 54%)",
                    700: "hsl(265, 98%, 50%)",
                    800: "hsl(265, 97%, 42%)",
                    900: "hsl(265, 94%, 35%)",
                    950: "hsl(262, 100%, 23%)",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
