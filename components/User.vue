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
import { useMutation } from '@vue/apollo-composable'
import { Button } from 'flowbite-vue'

import { LOGOUT_USER } from '../graphql/mutations/userMutations'
import { GET_USER } from '../graphql/queries/userQueries'

const { data, refresh } = await useAsyncQuery(GET_USER)
const { mutate: logoutGQL } = useMutation(LOGOUT_USER, () => ({
	update: () => {
		refresh()
	},
}))

const user = computed(() => data.value?.getUser)

const handleSignOut = async () => {
	const result = await logoutGQL()
	const data = result?.data.logout

	if (data.status === '200') {
		window.localStorage.removeItem('currentUser')
		window.location.href = '/login'
	}
}
</script>
