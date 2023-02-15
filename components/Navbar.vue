<template>
	<Navbar solid>
		<template #logo>
			<NavbarLogo
				link="http:localhost:3000/"
				alt="Joe's Logo"
				image-url="lighthouse.png"
			>
				<p class="text-[#333] dark:text-white">Fullstack Playground</p>
			</NavbarLogo>
		</template>

		<template v-if="showMenu" #default="{ isShowMenu }">
			<NavbarCollapse :is-show-menu="isShowMenu">
				<button class="!outline-none" @click="toggleDark">
					<Icon
						v-if="color.preference === 'light'"
						name="carbon-sun"
						size="20"
						class="text-[#333]"
					/>
					<Icon v-else name="carbon-moon" size="20" class="text-white" />
				</button>

				<NuxtLink
					class="flex h-[36px] items-center justify-center rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
					:class="
						path === '/' ? 'text-white dark:text-white md:text-blue-700' : ''
					"
					to="/"
					>Home</NuxtLink
				>
				<NuxtLink
					class="flex h-[36px] items-center justify-center rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
					:class="
						path === '/todo'
							? 'text-white dark:text-white md:text-blue-700'
							: ''
					"
					to="/todo"
					>Todo</NuxtLink
				>

				<LazyUser v-if="canDisplayUser" />
			</NavbarCollapse>
		</template>
	</Navbar>
</template>

<script setup lang="ts">
import { Navbar, NavbarLogo, NavbarCollapse } from 'flowbite-vue'
import { useRouter } from 'vue-router'
import LazyUser from '~/components/User.vue'

const router = useRouter()
const path = computed(() => router.currentRoute.value.path)

const color = useColorMode()

defineProps({
	showMenu: {
		type: Boolean,
		default: false,
	},
})

const toggleDark = () => {
	color.preference = color.value === 'dark' ? 'light' : 'dark'
}

const canDisplayUser = computed(() => {
	return typeof window !== 'undefined'
})
</script>
