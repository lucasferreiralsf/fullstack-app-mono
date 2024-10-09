module.exports = {
	extends: ['moon'],

	// TypeScript support
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.eslint.json',
		tsconfigRootDir: __dirname,
	},
	root: true, // Required!
	rules: {
		'@typescript-eslint/no-unsafe-argument': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/parameter-properties': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/promise-function-async': 'off',
		'@typescript-eslint/require-await': 'off',
		'@typescript-eslint/consistent-type-assertions': 'off',
		'@typescript-eslint/prefer-promise-reject-errors': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'promise/prefer-await-to-callbacks': 'off',
		'promise/no-promise-in-callback': 'off',
		'import/no-default-export': 'off',
		'import/no-unresolved': 'off',
		'import/no-useless-path-segments': 'off',
		'no-console': 'error',
		'no-param-reassign': 'off',
		'sort-keys': 'off',
		'global-require': 'off',
		'unicorn/prefer-module': 'off',
		'unicorn/no-useless-spread': 'off',
		'unicorn/error-message': 'off',
		'no-magic-numbers': 'off',
		'no-plusplus': 'off',
		'no-await-in-loop': 'off',
		'import/extensions': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'import/no-extraneous-dependencies': 'off',
		'simple-import-sort/imports': 'off',
		'unicorn/numeric-separators-style': 'off',
		'unicorn/prefer-string-raw': 'off',
	},
	overrides: [
		{
			files: [
				'apps/mobile/gymclub-mobileapp/**/*.ts',
				'apps/mobile/gymclub-mobileapp/**/*.tsx',
			],
			parserOptions: {
				project: ['apps/mobile/gymclub-mobileapp/tsconfig.json'],
				createDefaultProgram: true,
			},
			rules: {
				'@typescript-eslint/no-unused-expressions': 'off',
				'@typescript-eslint/no-use-before-define': 'off',
				'consistent-return': 'off',
				camelcase: 'off',
			},
		},
	],
};
