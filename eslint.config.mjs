import eslintPlugin from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import pluginNext from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import playwrightPlugin from "eslint-plugin-playwright";
import parser from "@typescript-eslint/parser";

export default [
  {
    ignores: [".next/", ".vscode/", "public/", "node_modules/", "dist/"],
  },

  {
    name: "ESLint Config - base",
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ...eslintPlugin.configs.recommended,
    rules: {
      "no-unused-vars": "off",
    },
  },

  {
    name: "ESLint Config - typescript",
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs.stylistic.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  {
    name: "ESLint Config - import",
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      "import/no-anonymous-default-export": "warn",
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },

  {
    name: "ESLint Config - react",
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["e2e/**/*", "playwright/**/*", "**/*.{spec,test}.{js,ts}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unknown-property": "off",
      "react/jsx-no-target-blank": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  {
    name: "ESLint Config - nextjs",
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@next/next": pluginNext,
    },
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: ["e2e/**/*", "playwright/**/*", "**/*.{spec,test}.{js,ts}"],
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },

  {
    name: "ESLint Config - accessibility",
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["e2e/**/*", "playwright/**/*", "**/*.{spec,test}.{js,ts}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      ...jsxA11yPlugin.configs.strict.rules,
      "jsx-a11y/alt-text": ["warn", { elements: ["img"], img: ["Image"] }],
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
    },
  },

  {
    name: "ESLint Config - playwright",
    files: ["e2e/**/*", "playwright/**/*", "**/*.{spec,test}.{js,ts}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      playwright: playwrightPlugin,
    },
    rules: {
      ...playwrightPlugin.configs["flat/recommended"].rules,
      "playwright/no-networkidle": "warn",
      "playwright/no-skipped-test": "warn",
      "playwright/no-wait-for-timeout": "warn",
      "playwright/prefer-web-first-assertions": "error",
      "playwright/prefer-to-have-length": "warn",
      "playwright/no-page-pause": "error",
      "playwright/expect-expect": "error",
    },
  },
];
