<template>
	<Navbar solid>
		<template #logo>
			<NavbarLogo link="/" alt="Joe's Logo" image-url="lighthouse.png">
				<p class="text-[#333] dark:text-white">Fullstack Playground</p>
			</NavbarLogo>
		</template>

		<template v-if="showMenu" #default="{ isShowMenu }">
			<NavbarCollapse :is-show-menu="isShowMenu">
				<li
					v-for="{ code, name } in locales as LocaleObject[]"
					:key="code"
					class="flex h-[36px] items-center justify-center"
				>
					<NuxtLink
						:to="switchLocalePath(code)"
						:class="
							locale === code
								? 'text-white dark:text-white md:text-blue-700'
								: 'dark:text-[#666]'
						"
					>
						{{ name }}
					</NuxtLink>
				</li>

				<li class="flex h-[36px] items-center justify-center">
					<button
						class="!outline-none"
						aria-label="Toggle Theme"
						@click="toggleDark"
					>
						<Icon
							v-if="color.preference === 'light'"
							name="carbon-sun"
							size="20"
							class="text-[#333]"
						/>
						<Icon v-else name="carbon-moon" size="20" class="text-white" />
					</button>
				</li>

				<li>
					<NuxtLink
						class="flex h-[36px] items-center justify-center rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
						:class="
							!path.includes('/todo')
								? 'text-white dark:text-white md:text-blue-700'
								: ''
						"
						:to="localePath('/')"
						>Home</NuxtLink
					>
				</li>
				<li>
					<NuxtLink
						class="flex h-[36px] items-center justify-center rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
						:class="
							path.includes('/todo')
								? 'text-white dark:text-white md:text-blue-700'
								: ''
						"
						:to="localePath('/todo')"
						>Todo</NuxtLink
					>
				</li>

				<li>
					<LazyUser v-if="canDisplayUser" />
				</li>
			</NavbarCollapse>
		</template>
	</Navbar>
</template>

<script setup lang="ts">
import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'
import { Navbar, NavbarCollapse, NavbarLogo } from 'flowbite-vue'
import { useRouter } from 'vue-router'
import LazyUser from '~/components/User.vue'

const router = useRouter()
const path = computed(() => router.currentRoute.value.path)

const color = useColorMode()

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

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
