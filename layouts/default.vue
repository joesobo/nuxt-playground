<template>
	<div
		class="format mx-auto flex w-full max-w-3xl flex-col pt-4 dark:format-invert"
	>
		<button class="!outline-none" @click="toggleDark">
			<Icon v-if="color.preference === 'light'" name="carbon-sun" size="20" />
			<Icon v-else name="carbon-moon" size="20" />
		</button>
		<slot />
	</div>
</template>

<script setup lang="ts">
const color = useColorMode()

const toggleDark = () => {
	color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>
