<template>
	<div class="mt-2 flex items-center">
		<p class="m-0">
			{{ user?.email ?? 'Error' }}
		</p>
		<Button class="ml-2" gradient="red-yellow" @click="handleSignOut">
			Sign Out
		</Button>
	</div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { Button } from 'flowbite-vue'

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
