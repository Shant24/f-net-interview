module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json", "./tsconfig.app.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh", "@stylistic/ts"],
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      {
        allowConstantExport: true,
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      2,
      {
        fixStyle: "separate-type-imports",
      },
    ],
    "@typescript-eslint/no-restricted-imports": [
      2,
      {
        paths: [
          {
            name: "react-redux",
            importNames: ["useSelector", "useStore", "useDispatch"],
            message: "Please use pre-typed versions from `src/app/hooks.ts` instead.",
          },
        ],
      },
    ],

    "@stylistic/ts/indent": ["error", 2],
    "no-console": ["warn", { allow: ["error"] }],
    // "react/display-name": "off",
    // "no-undef": "off",
    "react-hooks/exhaustive-deps": "warn",
    // "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
  },
};
