<template>
	<div class="format mx-auto w-full max-w-3xl pt-4 dark:format-invert">
		<nav class="flex h-10 w-full items-center justify-between text-lg">
			<Navigation />

			<button class="!outline-none" @click="toggleDark">
				<Icon
					v-if="color.preference === 'light'"
					name="carbon-sun"
					size="20"
					class="text-[#333]"
				/>
				<Icon v-else name="carbon-moon" size="20" class="text-white" />
			</button>

			<LazyUser v-if="canDisplayUser" />
		</nav>
		<slot />
	</div>
</template>

<script setup lang="ts">
import LazyUser from '~/components/User.vue'

const color = useColorMode()

const toggleDark = () => {
	color.preference = color.value === 'dark' ? 'light' : 'dark'
}

const canDisplayUser = computed(() => {
	return typeof window !== 'undefined'
})
</script>
