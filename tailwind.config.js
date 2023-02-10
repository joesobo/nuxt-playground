module.exports = {
	content: [
		'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
		'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
		'./node_modules/flowbite.{js,ts}',
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
	],
	theme: {
		extend: {},
	},
	plugins: [require('flowbite'), require('flowbite-typography')],
}
