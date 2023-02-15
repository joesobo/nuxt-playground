<template>
	<div class="my-4 flex flex-col items-center justify-center">
		<div class="flex items-center">
			<Icon
				name="uil:home"
				size="32"
				class="mr-4 mb-8 text-[#333] dark:text-white"
			/>
			<StoryblokComponent v-if="story" :blok="story.content" />
		</div>
		<p class="text-gray-900 dark:text-white">
			This is a small introductory Fullstack application for me to try out a few
			new technologies.
		</p>

		<NuxtImg
			preload
			src="/lighthouse.png"
			alt="Lighthouse"
			width="sm:100vw md:50vw lg:400px"
			height="sm:100vw md:50vw lg:400px"
		/>

		<h2
			class="mb-2 text-lg font-semibold text-gray-900 underline dark:text-white"
		>
			Stack:
		</h2>

		<ul class="w-full max-w-lg text-gray-500 dark:text-gray-400">
			<li class="mt-4 text-base font-semibold text-gray-900 dark:text-white">
				Frontend:
			</li>
			<ListItem label="Nuxt.js" active />
			<ListItem label="Vue 3" active />
			<ListItem label="TailwindCSS / Flowbite" active />

			<li class="mt-4 text-base font-semibold text-gray-900 dark:text-white">
				Testing:
			</li>
			<ListItem label="Vitest" active />
			<ListItem label="Testing Library" active />
			<ListItem label="Playwright" active />
			<ListItem label="CircleCI" active />

			<li class="mt-4 text-base font-semibold text-gray-900 dark:text-white">
				Backend:
			</li>
			<ListItem label="TRPC (Nuxt)" active />
			<ListItem label="Prisma" active />
			<ListItem label="Zod" active />

			<li class="mt-4 text-base font-semibold text-gray-900 dark:text-white">
				Database / Deploy / CMS:
			</li>
			<ListItem label="Supabase" active />
			<ListItem label="Vercel" active />
			<ListItem label="Storyblok" active />
		</ul>

		<h2
			class="mb-2 text-lg font-semibold text-gray-900 underline dark:text-white"
		>
			Features:
		</h2>

		<ul class="w-full max-w-lg text-gray-500 dark:text-gray-400">
			<ListItem label="I18n" active />
			<ListItem label="Images" active />
			<ListItem label="Icons" active />
			<ListItem label="CMS" active />
			<ListItem label="Authentication" active />
			<ListItem label="Dark Mode" active />
			<ListItem label="SEO" active />
		</ul>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'user',
	middleware: ['auth'],
})

const { locale } = useI18n()

const story = await useAsyncStoryblok('home', {
	version: 'draft',
	language: locale.value,
})
</script>
