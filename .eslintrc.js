module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["airbnb-base", "plugin:prettier/recommended"],
	overrides: [
		{
			env: {
				node: true,
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
		quotes: ["error", "double"],
		"import/extensions": ["error", "ignorePackages"],
		"import/prefer-default-export": "off",
		indent: ["error", "tab"],
		"no-tabs": "off",
		"max-len": ["error", { code: 100 }],
		"prettier/prettier": [
			"error",
			{
				singleQuote: false,
				useTabs: true,
				arrowParens: "always",
				printWidth: 100,
				semi: true,
				trailingComma: "all",
			},
		],
	},
};
