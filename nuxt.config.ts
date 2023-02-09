// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/apollo'],
	css: ['~/assets/css/main.css'],
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
