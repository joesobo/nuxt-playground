<template>
	<h1>
		{{ blok.header }}
	</h1>
</template>

<script setup lang="ts">
defineProps({
	blok: {
		type: Object,
		default: () => ({}),
	},
})
</script>
