import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "off",
      indent: ["error", 2],
      "no-console": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "react/jsx-boolean-value": ["error", "always"],
      "react/jsx-curly-spacing": ["error", { when: "never", children: true }],
      "react/jsx-key": "error",
      "react/jsx-no-bind": ["error", { allowArrowFunctions: true }],
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-target-blank": "error",
      "react/jsx-pascal-case": "error",
      "react/no-array-index-key": "error",
      "react/no-danger": "error",
      "react/no-deprecated": "error",
      "react/no-direct-mutation-state": "error",
      "react/no-unescaped-entities": "error",
      "react/no-unknown-property": "error",
      "react/prop-types": "off",
    },
  }
);
