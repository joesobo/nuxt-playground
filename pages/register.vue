<template>
	<div class="flex flex-col">
		<h1>Register</h1>
		<Input v-model="email" type="text" placeholder="email" aria-label="Email" />
		<Input
			v-model="password"
			type="password"
			placeholder="password"
			class="mt-4"
			aria-label="Password"
		/>
		<p v-if="errorMessage" class="mt-4 text-sm text-red-500">
			{{ errorMessage }}
		</p>
		<div>
			<Button class="mt-4" gradient="cyan-blue" @click="register">
				Register
			</Button>
		</div>
		<a
			href="/login"
			class="mt-4 text-sm text-gray-300 no-underline hover:underline"
		>
			Already have an account? Sign in
		</a>
	</div>
</template>

<script setup lang="ts">
import { Button, Input } from 'flowbite-vue'
import { ref } from 'vue'

const supabaseClient = useSupabaseClient()
const user = useSupabaseUser()

const email = ref('')
const password = ref('')
const errorMessage = ref()

const register = async () => {
	const { error } = await supabaseClient.auth.signUp({
		email: email.value,
		password: password.value,
	})

	errorMessage.value = error?.message
}

onMounted(() => {
	watchEffect(async () => {
		if (user.value) {
			await navigateTo('/')
		}
	})
})
</script>
