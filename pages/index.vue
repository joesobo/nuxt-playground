<template>
	<div class="my-4 flex flex-col items-center justify-center">
		<div class="flex items-center">
			<Icon name="uil:github" size="20" class="text-[#333] dark:text-white" />
			<h1 class="ml-4 mb-0">Welcome Home!</h1>
		</div>
		<nuxt-img preload src="/lighthouse.png" sizes="sm:100vw md:50vw lg:400px" />
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'user',
	middleware: ['auth'],
})
</script>
