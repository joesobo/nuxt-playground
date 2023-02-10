<template>
	<div class="mt-2 flex items-center">
		<p class="m-0">
			{{ user?.email ?? 'Error' }}
		</p>
		<Button class="ml-2" gradient="purple-pink" outline @click="handleSignOut">
			Sign Out
		</Button>
	</div>
</template>

<script setup lang="ts">
import { Button } from 'flowbite-vue'

const { $client } = useNuxtApp()
const currentEmail = window.localStorage.email

const { data: user, refresh } = await $client.getUser.useQuery({
	email: currentEmail,
})

const handleSignOut = async () => {
	const result = await $client.logoutUser.mutate({ email: currentEmail })
	refresh()

	if (result.status === 200) {
		window.localStorage.removeItem('email')
		window.location.href = '/login'
	}
}
</script>
