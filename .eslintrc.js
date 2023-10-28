module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["airbnb-base", "jest", "cypress", "plugin:prettier/recommended"],
	overrides: [
		{
			env: {
				node: true,
				"jest/globals": true,
				"cypress/globals": true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		"import/extensions": ["error", "ignorePackages"],
		"import/prefer-default-export": "off",
	},
};
