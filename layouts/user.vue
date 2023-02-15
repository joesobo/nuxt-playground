<template>
	<div>
		<Navbar showMenu />
		<div class="format mx-auto w-full max-w-3xl pt-4 dark:format-invert">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'
</script>
