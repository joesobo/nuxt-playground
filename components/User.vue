<template>
	<div class="flex">
		<p>
			{{ user.email }}
		</p>
		<button
			class="ml-4 rounded border border-white px-2"
			@click="handleSignOut"
		>
			Sign Out
		</button>
	</div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { watch } from 'vue'

import { LOGOUT_USER } from '../graphql/mutations/userMutations'
import { GET_USER } from '../graphql/queries/userQueries'

const { data } = await useAsyncQuery(GET_USER)
const { mutate: logoutGQL } = useMutation(LOGOUT_USER)

const user = data.value?.getUser

// Redirect to login page if user is not logged in
// TODO: turn into Nuxt middleware
watch(user, (val) => {
	if (val?.status === '400') {
		alert('You are not logged in. Please log in to continue.')
		window.location.href = '/login'
	}
})

const handleSignOut = async () => {
	const result = await logoutGQL()
	const data = result?.data.logout

	if (data.status === '200') {
		window.localStorage.removeItem('currentUser')
		window.location.href = '/login'
	}
}
</script>
