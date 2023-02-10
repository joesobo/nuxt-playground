import { GET_USER } from '../graphql/queries/userQueries'

export default defineNuxtRouteMiddleware(async () => {
	const { data } = await useAsyncQuery(GET_USER)
	const user = computed(() => data.value?.getUser)

	if (user.value.status === '400') {
		if (typeof window !== 'undefined') {
			alert('You are not logged in. Please log in to continue.')
			window.location.href = '/login'
		}
		return navigateTo('/login')
	}
})
