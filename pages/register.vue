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
		<p v-if="error" class="mt-4 text-sm text-red-500">
			{{ error }}
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

const { $client } = useNuxtApp()

const email = ref('')
const password = ref('')
const error = ref()

const register = async () => {
	const result = await $client.createUser.mutate({
		email: email.value,
		password: password.value,
	})

	if (result.status === 200) {
		console.log('SUCCESS: ', result.message)
		window.location.href = '/'
	} else {
		console.log('ERROR: ', result.message)
		switch (result.message) {
			case 'auth/invalid-email':
				error.value = 'Invalid email'
				break
			case 'auth/invalid-password':
				error.value = 'Invalid password'
				break
			default:
				error.value = 'Invalid email or password'
				break
		}
	}
}
</script>
