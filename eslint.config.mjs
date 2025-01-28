import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  {
    ignores: ["**/node_modules/", "**/.next/", "**/public/"],
  },
  ...compat.extends("next/core-web-vitals", "eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"),
  {
    rules: {
      "no-unused-vars": ["off"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
        },
      ],

      "import/order": [
        "warn",
        {
          groups: ["external", "builtin", "internal", "sibling", "parent", "index"],

          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "next",
              group: "external",
              position: "before",
            },
          ],

          pathGroupsExcludedImportTypes: ["react", "next"],
          "newlines-between": "always",

          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],

      "import/no-extraneous-dependencies": "error",
      "import/prefer-default-export": "off",

      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: false,
          shorthandLast: true,
          ignoreCase: true,
          noSortAlphabetically: false,
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@/src/features/*/*"],
        },
      ],
    },
  },
  ...compat.extends("plugin:playwright/recommended").map((config) => ({
    ...config,
    files: ["e2e/**"],
  })),
];

export default eslintConfig;
