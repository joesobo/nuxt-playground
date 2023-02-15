<template>
	<li class="flex items-center">
		<Icon
			:name="
				active
					? 'material-symbols:check-circle-outline-rounded'
					: 'charm:circle-cross'
			"
			size="16"
			:class="active ? 'text-green-500 dark:text-green-400' : 'text-gray-400'"
			class="mr-2"
		/>
		{{ label }}
	</li>
</template>

<script setup lang="ts">
defineProps({
	label: {
		type: String,
		default: '',
		required: true,
	},
	active: {
		type: Boolean,
		default: false,
	},
})
</script>
