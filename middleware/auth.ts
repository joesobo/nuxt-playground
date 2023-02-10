export default defineNuxtRouteMiddleware(async () => {
	const { $client } = useNuxtApp()

	const { data: user } = await $client.getUser.useQuery()

	if (user.value?.status === 400) {
		if (typeof window !== 'undefined') {
			alert('You are not logged in. Please log in to continue.')
			window.location.href = '/login'
		}
		return navigateTo('/login')
	}
})
