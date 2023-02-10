export default defineNuxtRouteMiddleware(async () => {
	const currentEmail = window.localStorage.email

	if (!currentEmail) {
		window.location.href = '/login'
	}

	const { $client } = useNuxtApp()
	const { data: user } = await $client.getUser.useQuery({
		email: currentEmail,
	})

	if (user.value?.status === 400) {
		window.location.href = '/login'
	}
})
