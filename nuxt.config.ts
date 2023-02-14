// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: 'en',
			},
			charset: 'utf-16',
			viewport: 'width=500, initial-scale=1',
			title: "Joe's Fullstack Playground",
			meta: [{ name: 'description', content: "Joe's Fullstack Playground" }],
		},
	},
	build: { transpile: ['trpc-nuxt'] },
	modules: [
		'@nuxtjs/tailwindcss',
		'@nuxtjs/color-mode',
		'@nuxt/image-edge',
		'@nuxtjs/supabase',
		'nuxt-icon',
		'nuxt-vitest',
		'@vueuse/nuxt',
	],
	css: ['~/assets/css/tailwind.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	colorMode: { classSuffix: '' },
})
