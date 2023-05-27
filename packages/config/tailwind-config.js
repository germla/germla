
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        '../../apps/web/src/**/*.{jsx,tsx,js,mdx}',
        "../ui/src/components/*.{jsx,tsx,js,mdx}"
    ],
    darkMode: ['class', '[data-theme="dark"]'],
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