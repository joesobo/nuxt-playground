<template>
	<div class="flex flex-col">
		<Input
			v-model="email"
			type="text"
			placeholder="email"
			class="mt-4"
			aria-label="Email"
		/>
		<Input
			v-model="password"
			type="password"
			placeholder="password"
			class="mt-4"
			aria-label="Password"
		/>
		<p v-if="error" class="mt-4 text-red-500">
			{{ error }}
		</p>
		<div>
			<Button class="mt-4" gradient="cyan-blue" @click="login"> Login </Button>
		</div>
		<a
			href="/register"
			class="mt-4 text-sm text-gray-300 no-underline hover:underline"
			>Don't have an account? Register here</a
		>
	</div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { Button, Input } from 'flowbite-vue'
import { ref } from 'vue'

import { LOGIN_USER } from '../graphql/mutations/userMutations'

const email = ref('')
const password = ref('')
const error = ref()

const { mutate: loginGQL } = useMutation(LOGIN_USER, () => ({
	variables: {
		email: email.value,
		password: password.value,
	},
}))

const login = async () => {
	const result = await loginGQL()
	const data = result?.data.login

	if (data.status === '200') {
		console.log('SUCCESS: ', data.message)
		window.location.href = '/'
	} else {
		switch (data.message) {
			case 'auth/invalid-email':
				error.value = 'Invalid email'
				break
			case 'auth/user-not-found':
				error.value = 'No account with that email was found'
				break
			case 'auth/wrong-password':
				error.value = 'Incorrect password'
				break
			default:
				error.value = 'Invalid email or password'
				break
		}
	}
}
</script>
