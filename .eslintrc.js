module.exports = {
    root: true,
    // This tells ESLint to load the config from the package `@germla/config`
    extends: [require.resolve("./packages/config/eslint-config")],
    settings: {
        next: {
            rootDir: ["apps/*/"],
        },
    },
};