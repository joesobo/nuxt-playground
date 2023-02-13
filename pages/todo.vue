<template>
	<!-- Form -->
	<div class="flex flex-col">
		<h1>Todo List</h1>
		<div class="flex">
			<!-- Name -->
			<Input
				v-model="todoTitle"
				class="w-full"
				aria-label="New Todo Title"
				placeholder="Todo Title"
			/>
			<!-- Color -->
			<input
				v-model="todoColor"
				class="ml-2 h-10 w-10 rounded border-4 border-solid border-white"
				type="color"
				aria-label="New Todo Color"
			/>
			<!-- Todo State -->
			<Checkbox v-model="todoChecked" class="ml-2" label="New Todo Checkbox" />
		</div>
		<!-- Description -->
		<Textarea
			v-model="todoDescription"
			class="mt-2"
			placeholder="Add a description"
			label="New Todo Description"
			aria-label="New Todo Description"
		/>
		<!-- <p v-if="error" class="mt-2 font-bold text-red-500">
			{{ error }}
		</p> -->
		<div class="mt-2 flex">
			<Button gradient="cyan-blue" @click="addTodo"> Add </Button>
			<Button gradient="purple-pink" outline class="ml-2" @click="resetForm">
				Clear
			</Button>
		</div>

		<!-- Display -->
		<div class="mt-8 flex flex-col pl-0">
			<Card
				v-for="todo in filterTodos"
				:key="todo.id"
				class="mt-4 w-full max-w-full"
				:class="
					pickTextColorBasedOnBgColorAdvanced(
						todo.color,
						'!dark:text-white !text-white',
						'!dark:text-black !text-black'
					)
				"
				:style="`background-color: ${todo.color}`"
			>
				<div class="flex justify-between">
					<div class="flex">
						<Checkbox
							v-model="todo.completed"
							:label="`Todo Checkbox ${todo.id}`"
							@change="updateTodo(todo)"
						/>
						<Input
							v-model="todo.title"
							class="ml-2 bg-transparent dark:bg-transparent"
							:class="
								pickTextColorBasedOnBgColorAdvanced(
									todo.color,
									'!dark:text-gray-300 !text-gray-300',
									'!dark:text-gray-700 !text-gray-700'
								)
							"
							aria-label="Todo Title"
							@change="updateTodo(todo)"
						/>
					</div>
					<button class="ml-2" @click="removeTodo(todo)">X</button>
				</div>

				<div>
					<Input
						v-model="todo.description"
						class="mt-2 bg-transparent text-sm dark:bg-transparent"
						:class="
							pickTextColorBasedOnBgColorAdvanced(
								todo.color,
								'!dark:text-gray-300 !text-gray-300',
								'!dark:text-gray-700 !text-gray-700'
							)
						"
						aria-label="Todo Description"
						@change="updateTodo(todo)"
					/>
				</div>
			</Card>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Todo } from '@prisma/client'
import { Button, TheCard as Card, Input } from 'flowbite-vue'
import { pickTextColorBasedOnBgColorAdvanced } from '../utils/colorPicker'
import Checkbox from '~/components/Checkbox.vue'
import Textarea from '~/components/Textarea.vue'

definePageMeta({
	layout: 'user',
	middleware: ['auth'],
})

const user = useSupabaseUser()

// Vue var setup
const todoTitle = ref('')
const todoDescription = ref('')
const todoColor = ref('#000')
const todoChecked = ref(false)
const storeTodo: Ref<Todo | undefined> = ref(undefined)

const { $client } = useNuxtApp()
// Fetching Data
const { data: todos, refresh } = await $client.getTodos.useQuery()

const filterTodos = computed(() =>
	todos.value?.filter((todo) => todo.email === user.value?.email)
)

// Creating Data
const addTodo = async () => {
	const user = useSupabaseUser()

	if (user.value) {
		await $client.addTodo.mutate({
			title: todoTitle.value,
			description: todoDescription.value,
			completed: todoChecked.value,
			color: todoColor.value,
			email: user.value.email as string,
		})
		refresh()
	}
}

// Updating Data
const updateTodo = async (todo: Todo) => {
	storeTodo.value = todo
	await $client.updateTodo.mutate({
		id: todo.id,
		title: todo.title,
		description: todo.description || '',
		color: todo.color || '#000',
		completed: todo.completed,
		email: todo.email,
	})
	refresh()
}

// Deleting Data
const removeTodo = async (todo: Todo) => {
	storeTodo.value = todo
	await $client.deleteTodo.mutate({
		id: todo.id,
	})
	refresh()
}

// Reset Form
const resetForm = () => {
	todoTitle.value = ''
	todoDescription.value = ''
	todoChecked.value = false
	todoColor.value = '#000'
}
</script>
