// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: 'en',
			},
			charset: 'utf-16',
			viewport: 'width=500, initial-scale=1',
			title: 'My Nuxt Playground',
			meta: [{ name: 'description', content: 'My Nuxt playground.' }],
		},
	},
	build: { transpile: ['trpc-nuxt'] },
	modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', 'nuxt-vitest', '@vueuse/nuxt'],
	css: ['~/assets/css/tailwind.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
})
