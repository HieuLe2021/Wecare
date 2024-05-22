import eslint from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import tailwindPlugin from "eslint-plugin-tailwindcss";
import tseslint from "typescript-eslint";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...tseslint.config(
    {
      // Globally ignored files
      ignores: ["**/*.config.*"],
    },
    {
      files: ["**/*.js", "**/*.ts", "**/*.tsx"],
      plugins: {
        import: importPlugin,
      },
      extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.recommendedTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,
      ],
      rules: {
        /*
         * t3-turbo
         */
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/consistent-type-imports": [
          "warn",
          { prefer: "type-imports", fixStyle: "separate-type-imports" },
        ],
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            checksVoidReturn: { attributes: false },
          },
        ],
        "@typescript-eslint/no-unnecessary-condition": [
          "error",
          {
            allowConstantLoopConditions: true,
          },
        ],

        "@typescript-eslint/prefer-nullish-coalescing": "off",
        // "@typescript-eslint/no-non-null-assertion": "error",
        "import/consistent-type-specifier-style": ["error", "prefer-top-level"],

        /*
         * t3
         */
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/require-await": "off",

        /*
         * Nextjs
         * that rules allowed by Nextjs
         */
        // "@typescript-eslint/unbound-method": "off",
      },
    },
    {
      linterOptions: { reportUnusedDisableDirectives: true },
      languageOptions: { parserOptions: { project: true } },
    },
  ),

  ...tseslint.config({
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    rules: {
      "no-restricted-properties": [
        "error",
        {
          object: "process",
          property: "env",
          message:
            "Use `import { env } from '~/env'` instead to ensure validated types.",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          name: "process",
          importNames: ["env"],
          message:
            "Use `import { env } from '~/env'` instead to ensure validated types.",
        },
      ],
    },
  }),
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...hooksPlugin.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        React: "writable",
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // TypeError: context.getAncestors is not a function
      "@next/next/no-duplicate-head": "off",
    },
  },
  {
    plugins: {
      tailwindcss: tailwindPlugin,
    },
    // rules: {
    //   ...tailwindPlugin.rules,
    // },
    settings: {
      tailwindcss: {
        callees: ["clsm", "cva", "cx", "cn"],
        // config: fileURLToPath(
        //   new URL("../tailwind/web.ts", "file://" + __filename),
        // ),
        cssFiles: [
          "**/*.{css,scss}",
          "!**/node_modules",
          "!**/.*",
          "!**/dist",
          "!**/build",
        ],
        whitelist: ["_.+"],
      },
    },
  },
];
