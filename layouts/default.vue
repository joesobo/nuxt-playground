<template>
	<div>
		<Navbar />
		<div
			class="format mx-auto flex w-full max-w-3xl flex-col pt-4 dark:format-invert"
		>
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'
</script>
