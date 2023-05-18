const baseConfig = require('@germla/config/tailwind-config');
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{jsx,tsx,js,mdx}',
        './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
        "./node_modules/react-tailwindcss-select/dist/index.esm.js",
        "./node_modules/@germla/ui/components/*.{jsx,tsx,js,mdx}"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                body: ['Inter'],
                primary: ['Rubik'],
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        h1: {
                            color: 'var(--tw-prose-headings)',
                            fontWeight: '700',
                            fontSize: theme('fontSize.2xl')[0],
                            ...theme('fontSize.2xl')[1],
                            marginBottom: theme('spacing.2'),
                          },
                          h2: {
                            color: 'var(--tw-prose-headings)',
                            fontWeight: '600',
                            fontSize: theme('fontSize.lg')[0],
                            ...theme('fontSize.lg')[1],
                            marginTop: theme('spacing.16'),
                            marginBottom: theme('spacing.2'),
                          },
                          h3: {
                            color: 'var(--tw-prose-headings)',
                            fontSize: theme('fontSize.base')[0],
                            ...theme('fontSize.base')[1],
                            fontWeight: '600',
                            marginTop: theme('spacing.10'),
                            marginBottom: theme('spacing.2'),
                          },
                    }
                },
            }),
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
