<template>
	<div class="flex flex-col">
		<input
			v-model="email"
			type="text"
			placeholder="email"
			class="mt-4"
			aria-label="Email"
		/>
		<input
			v-model="password"
			type="text"
			placeholder="password"
			class="mt-4"
			aria-label="Password"
		/>
		<p v-if="error" class="mt-4 text-sm text-gray-300">
			{{ error }}
		</p>
		<div>
			<button
				class="mt-4 rounded border border-white p-2 text-white"
				@click="register"
			>
				Register
			</button>
		</div>
		<a href="/login" class="mt-4 text-sm text-gray-300">
			Already have an account? Sign in
		</a>
	</div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { ref } from 'vue'

import { ADD_USER } from '../graphql/mutations/userMutations'

const email = ref('')
const password = ref('')
const error = ref()

const { mutate: registerGQL } = useMutation(ADD_USER, () => ({
	variables: {
		email: email.value,
		password: password.value,
	},
}))

const register = async () => {
	const result = await registerGQL()
	const data = result?.data.register

	if (data.status === '200') {
		console.log('SUCCESS: ', data.message)
		window.location.href = '/'
	} else {
		console.log('ERROR: ', data.message)
		switch (data.message) {
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
