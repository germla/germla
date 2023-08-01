module.exports = {
    root: true,
    extends: [require.resolve("./packages/config/eslint-config")],
    settings: {
        next: {
            rootDir: ["apps/*/"],
        },
    },
};