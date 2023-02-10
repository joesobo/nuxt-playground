module.exports = {
	plugins: [
		require('prettier-plugin-import-sort'),
		require('prettier-plugin-vue'),
		require('prettier-plugin-tailwindcss'), // MUST come last
	],
	pluginSearchDirs: false,
	tailwindConfig: './tailwind.config.js',
	trailingComma: 'es5',
	semi: false,
	singleQuote: true,
	useTabs: true,
}
