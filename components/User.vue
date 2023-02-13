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

const supabaseClient = useSupabaseClient()
const user = useSupabaseUser()

const handleSignOut = async () => {
	await supabaseClient.auth.signOut()
	navigateTo('/login')
}
</script>
