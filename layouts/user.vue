<template>
	<div class="mx-auto w-full max-w-3xl">
		<nav
			class="flex h-10 w-full items-center justify-between text-lg text-white"
		>
			<Navigation />

			<User />
		</nav>
		<slot />
	</div>
</template>

<script setup lang="ts">
import User from '~/components/User.vue'
</script>
