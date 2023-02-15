<template>
	<div class="flex flex-col">
		<StoryblokComponent v-if="story" :blok="story.content" />

		<LongCard>
			<Input
				v-model="email"
				type="text"
				placeholder="email"
				aria-label="Email"
			/>
			<Input
				v-model="password"
				type="password"
				placeholder="password"
				class="mt-4"
				aria-label="Password"
			/>
			<p v-if="errorMessage" class="mt-4 text-red-500">
				{{ errorMessage }}
			</p>
			<div>
				<Button class="mt-4" gradient="cyan-blue" @click="login">
					Login
				</Button>
			</div>
			<a
				href="/register"
				class="mt-4 text-sm text-gray-300 no-underline hover:underline"
				>Don't have an account? Register here</a
			>
		</LongCard>
	</div>
</template>

<script setup lang="ts">
import { Button, Input } from 'flowbite-vue'
import { ref } from 'vue'
import LongCard from '~/components/LongCard.vue'

const supabaseClient = useSupabaseClient()
const user = useSupabaseUser()

const { locale } = useI18n()

const story = await useAsyncStoryblok('login', {
	version: 'draft',
	language: locale.value,
})

const email = ref('')
const password = ref('')
const errorMessage = ref()

const login = async () => {
	const { error } = await supabaseClient.auth.signInWithPassword({
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
