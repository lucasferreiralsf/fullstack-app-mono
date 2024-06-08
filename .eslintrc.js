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
		'import/no-unresolved': 'off',
		'import/no-useless-path-segments': 'off',
		'no-console': 'error',
	},
};
