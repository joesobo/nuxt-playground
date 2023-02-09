<template>
	<defaultLayout>
		<nav
			class="mx-auto flex h-10 w-full max-w-3xl items-center justify-between text-lg text-white"
		>
			<Navigation />

			<User />
		</nav>
		<slot />
	</defaultLayout>
</template>

<script setup lang="ts">
import User from '~/components/User.vue'
</script>
