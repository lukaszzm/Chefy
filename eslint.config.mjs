import eslintPlugin from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import playwrightPlugin from "eslint-plugin-playwright";

const eslintConfig = [
  {
    name: "custom/eslint/recommended",
    files: ["**/*.mjs", "**/*.ts", "**/*.tsx"],
    ...eslintPlugin.configs.recommended,
    rules: {
      "no-unused-vars": "off",
    },
  },
];

const ignoresConfig = [
  {
    name: "custom/eslint/ignores",
    ignores: [".next/", ".vscode/", "public/"],
  },
];

const tseslintConfig = tseslint.config(
  {
    name: "custom/typescript-eslint/recommended",
    files: ["**/*.ts", "**/*.tsx"],
    extends: [...tseslint.configs.recommended, ...tseslint.configs.stylistic],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
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
    files: ["**/*.mjs"],
    ...tseslint.configs.disableTypeChecked,
    name: "custom/typescript-eslint/disable-type-checked",
  }
);

const nextConfig = [
  {
    name: "custom/next/config",
    files: ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"],
    plugins: {
      react: reactPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "react-hooks": reactHooksPlugin,
      "@next/next": nextPlugin,
      import: importPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...importPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.strict.rules,
      "import/no-anonymous-default-export": "warn",
      "react/no-unknown-property": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-no-target-blank": "off",
      "jsx-a11y/alt-text": ["warn", { elements: ["img"], img: ["Image"] }],
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
];

const playwrightConfig = [
  {
    name: "custom/playwright/config",
    files: ["e2e/**", "/playwright/**"],
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

const finalConfig = [...eslintConfig, ...ignoresConfig, ...tseslintConfig, ...nextConfig, ...playwrightConfig];

export default finalConfig;
