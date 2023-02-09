module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'plugin:vuejs-accessibility/recommended',
		'@nuxtjs/eslint-config-typescript',
		'plugin:prettier/recommended',
		'plugin:tailwindcss/recommended',
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	rules: {
		'linebreak-style': ['error', 'unix'],
		'vue/multi-word-component-names': 'off',
		'prettier/prettier': [
			'error',
			{
				semi: false,
				singleQuote: true,
				useTabs: true,
				trailingComma: 'es5',
			},
		],
	},
	plugins: [
		'vue',
		'@typescript-eslint',
		'vuejs-accessibility',
		'tailwindcss',
	],
	settings: {
		tailwindcss: {
			config: 'tailwind.config.js',
			cssFiles: [
				'**/*.css',
				'!**/node_modules',
				'!**/.*',
				'!**/dist',
				'!**/build',
			],
		},
	},
}
