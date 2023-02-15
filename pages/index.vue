<template>
	<div class="my-4 flex flex-col items-center justify-center">
		<div class="flex items-center">
			<Icon name="uil:home" size="32" class="text-[#333] dark:text-white" />
			<h1 class="ml-4 mb-0">Welcome Home!</h1>
		</div>
		<p class="text-gray-900 dark:text-white">
			This is a small introductory Fullstack application for me to try out a few
			new technologies.
		</p>

		<NuxtImg preload src="/lighthouse.png" sizes="sm:100vw md:50vw lg:400px" />

		<h2
			class="mb-2 text-lg font-semibold text-gray-900 underline dark:text-white"
		>
			Stack:
		</h2>

		<ul class="w-full max-w-lg text-gray-500 dark:text-gray-400">
			<h3 class="mt-4 text-base font-semibold text-gray-900 dark:text-white">
				Frontend:
			</h3>
			<ListItem label="Nuxt.js" active />
			<ListItem label="Vue 3" active />
			<ListItem label="TailwindCSS / Flowbite" active />

			<h3 class="mt-4 text-base font-semibold text-gray-900 dark:text-white">
				Testing:
			</h3>
			<ListItem label="Vitest" active />
			<ListItem label="Testing Library" active />
			<ListItem label="Playwright" active />
			<ListItem label="CircleCI" active />

			<h3 class="mt-4 text-base font-semibold text-gray-900 dark:text-white">
				Backend:
			</h3>
			<ListItem label="TRPC (Nuxt)" active />
			<ListItem label="Prisma" active />
			<ListItem label="Zod" active />

			<h3 class="mt-4 text-base font-semibold text-gray-900 dark:text-white">
				Database / Deploy:
			</h3>
			<ListItem label="Supabase" active />
			<ListItem label="Vercel" active />
		</ul>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'user',
	middleware: ['auth'],
})
</script>
