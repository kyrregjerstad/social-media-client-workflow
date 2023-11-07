module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"airbnb-base",
		"plugin:jest/recommended",
		"plugin:cypress/recommended",
		"plugin:prettier/recommended",
	],
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
		"import/no-extraneous-dependencies": [
			"error",
			{
				devDependencies: ["**/*.test.js", "**/*.spec.js"],
			},
		],
	},
};
