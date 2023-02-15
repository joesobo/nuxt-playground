<template>
	<div v-editable="blok">
		<StoryblokComponent
			v-for="iblok in blok.body"
			:key="iblok._uid"
			:blok="iblok"
		/>
	</div>
</template>

<script setup lang="ts">
defineProps({
	blok: {
		type: Object,
		default: () => {},
	},
})
</script>
