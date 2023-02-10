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

const { data: user, refresh } = await $client.getUser.useQuery()

const handleSignOut = async () => {
	const result = await $client.logoutUser.mutate()
	refresh()

	if (result.status === 200) {
		window.localStorage.removeItem('currentUser')
		window.location.href = '/login'
	}
}
</script>
