/** @type {import("eslint").Linter.Config} */
module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: [
		'eslint:recommended',
		// 'airbnb',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
	],
	env: {
		es2022: true,
		node: true,
		browser: true,
	},
	globals: {
		DEV_SERVER: true,
		API_DOMAIN: true,
		JSX: true,
		react: true,
		typescript: true,
	},
	plugins: ['json', 'import', '@typescript-eslint', 'unused-imports', 'react', 'react-hooks'],
	rules: {
		'@typescript-eslint/no-explicit-any': [
			'off',
			{
				fixToUnknown: true,
				ignoreRestArgs: false,
			},
		],
		'react/no-unescaped-entities': 1,
		'no-mixed-spaces-and-tabs': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'require-await': 'error',
		'@typescript-eslint/ban-ts-comment': 0,
		// 'prettier/prettier': ['error'],
		'react/jsx-filename-extension': ['error', { extensions: ['.tsx', 'js', 'jsx'] }],
		'react/destructuring-assignment': 0,
		'react/no-array-index-key': 0,
		'newline-before-return': 'error',
		'import/no-extraneous-dependencies': 0,
		'no-shadow': 0,
		'jsx-a11y/label-has-associated-control': 0,
		'@typescript-eslint/no-var-requires': 0,
		'consistent-return': 0,
		curly: 'error',
		'no-param-reassign': 0,
		'import/prefer-default-export': 0,
		'no-return-assign': 0,
		// "react/jsx-max-props-per-line": [1, { maximum: 1 }], //it doesn't work with prettier, you can remove prettier from rules: 'prettier/prettier'...
		// "react/jsx-first-prop-new-line": [1, "multiline"], //it doesn't work with prettier, you can remove prettier from rules: 'prettier/prettier'...
		'react/prop-types': 0,
		'react/prefer-stateless-function': 0,
		'react/react-in-jsx-scope': 0,
		'react/jsx-props-no-spreading': 0,
		'react/jsx-wrap-multilines': ['error', { arrow: true, return: true, declaration: true }],
		'spaced-comment': ['error', 'always'],
		'unused-imports/no-unused-imports': 'error',
		'no-underscore-dangle': 0,
		'no-use-before-define': 'off',
		'no-unused-expressions': ['error', { allowShortCircuit: true }],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-plusplus': 0,
		'class-methods-use-this': 0,
		'max-len': [
			'warn',
			{
				code: 120,
				tabWidth: 2,
				comments: 1000,
				ignoreComments: true,
				ignoreTrailingComments: true,
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true,
			},
		],
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			"node": {
				"paths": [
					"src"
				],
				"extensions": [
					".js",
					".jsx",
					".mdx",
					".tsx",
					".ts"
				]
			},
			typescript: {
				alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
				project: ['./tsconfig.json'],
			},
		},
	},
}
