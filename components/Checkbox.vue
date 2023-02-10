<template>
	<div class="flex items-center">
		<input
			id="default-checkbox"
			v-model="model"
			type="checkbox"
			:aria-label="label"
			class="h-5 w-5 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
		/>
	</div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps({
	label: {
		type: String,
		default: '',
		required: true,
	},
	modelValue: {
		type: Boolean,
		default: false,
	},
})
const model = useVModel(props, 'modelValue')
</script>
