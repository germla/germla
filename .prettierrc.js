module.exports = {
    semi: true,
    singleQuote: false,
    jsxSingleQuote: false,
    bracketSameLine: true,
    bracketSpacing: true,
    trailingComma: "es5",
    printWidth: 100,
    arrowParens: "always",
    importOrder: [
      "^@(germla|ee)/(.*)$",
      "^@lib/(.*)$",
      "^@components/(.*)$",
      "^~/(.*)$",
      "^[./]",
    ],
    importOrderSeparation: true,
    plugins: [
    //   "@trivago/prettier-plugin-sort-imports",
    //   "prettier-plugin-tailwindcss",
    ],
  };
  