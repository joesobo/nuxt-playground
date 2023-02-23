<template>
	<div class="flex items-center justify-center">
		<p class="m-0 text-[#333] dark:text-white">
			{{ user?.email ?? 'Error' }}
		</p>
		<Button
			label="Sign Out"
			class="ml-2"
			size="sm"
			gradient="purple-pink"
			@click="handleSignOut"
		/>
	</div>
</template>

<script setup lang="ts">
import { Button } from '@poleski/button'

const supabaseClient = useSupabaseClient()
const user = useSupabaseUser()

const handleSignOut = async () => {
	await supabaseClient.auth.signOut()
	navigateTo('/login')
}
</script>
