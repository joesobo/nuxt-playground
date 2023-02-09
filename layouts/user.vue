<template>
	<defaultLayout>
		<nav class="flex h-10 w-full items-center justify-between text-lg text-white">
			<Navigation />

			<User />
		</nav>
		<slot />
	</defaultLayout>
</template>

<script setup lang="ts">
import User from '~/components/User.vue'
import { default as defaultLayout } from './default.vue';
</script>
