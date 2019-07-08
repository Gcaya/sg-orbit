module.exports = {
    parser: "babel-eslint",
    extends: [
        "plugin:jsx-control-statements/recommended"
    ],
    plugins: ["jsx-a11y", "react", "jsx-control-statements"],
    parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: "detect"
        }
    },
    rules: {
        "jsx-quotes": ["warn", "prefer-double"],

        // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
        "react/forbid-foreign-prop-types": ["warn", { allowInPropTypes: true }],
        "react/jsx-no-comment-textnodes": "warn",
        "react/jsx-no-duplicate-props": ["warn", { ignoreCase: true }],
        "react/jsx-no-target-blank": "warn",
        "react/jsx-no-undef": ["warn", { allowGlobals: true }],
        "react/jsx-pascal-case": [
        "warn",
        {
            allowAllCaps: true,
            ignore: [],
        },
        ],
        "react/jsx-uses-react": "warn",
        "react/jsx-uses-vars": "warn",
        "react/no-danger-with-children": "warn",
        "react/no-direct-mutation-state": "warn",
        "react/no-is-mounted": "warn",
        "react/no-typos": "error",
        "react/react-in-jsx-scope": "off",
        "react/require-render-return": "error",
        "react/style-prop-object": "warn",
        "react/button-has-type": "error",
        "react/destructuring-assignment": ["error", "always", { ignoreClassFields: true }],
        "react/jsx-boolean-value": ["error", "never"],

        // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules
        "jsx-a11y/accessible-emoji": "warn",
        "jsx-a11y/alt-text": "warn",
        "jsx-a11y/anchor-has-content": "warn",
        "jsx-a11y/anchor-is-valid": [
        "warn",
        {
            aspects: ["noHref", "invalidHref"],
        },
        ],
        "jsx-a11y/aria-activedescendant-has-tabindex": "warn",
        "jsx-a11y/aria-props": "warn",
        "jsx-a11y/aria-proptypes": "warn",
        "jsx-a11y/aria-role": "warn",
        "jsx-a11y/aria-unsupported-elements": "warn",
        "jsx-a11y/heading-has-content": "warn",
        "jsx-a11y/iframe-has-title": "warn",
        "jsx-a11y/img-redundant-alt": "warn",
        "jsx-a11y/no-access-key": "warn",
        "jsx-a11y/no-distracting-elements": "warn",
        "jsx-a11y/no-redundant-roles": "warn",
        "jsx-a11y/role-has-required-aria-props": "warn",
        "jsx-a11y/role-supports-aria-props": "warn",
        "jsx-a11y/scope": "warn",
    }
};
