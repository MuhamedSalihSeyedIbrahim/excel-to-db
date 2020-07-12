module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },

    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    /**
     *
     *  possible values of rules:
     *      0 - off/ switch of the rule,
     *      1 - on / warn the user,
     *      2 - on / stricty follow the rule,
     *      []- on / advanced configurations
     */
    rules: {
        '@typescript-eslint/no-explicit-any': 0, // Rule to allow : ANY datatype
        'no-console': 0, //Rule to control console statement
        '@typescript-eslint/explicit-function-return-type': 0, //Rule to control return datatype specifying
        '@typescript-eslint/explicit-module-boundary-types': 0, //Rule to control return datatype specifying in ts
        '@typescript-eslint/no-empty-function': 0, //Rule to control empty function declaration,
    },
};
