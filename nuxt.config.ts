// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/apollo',
		'@nuxtjs/tailwindcss',
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
	apollo: {
		clients: {
			default: {
				httpEndpoint: 'http://localhost:4000/graphql',
				inMemoryCacheOptions: {
					addTypename: false,
				},
			},
		},
	},
})
