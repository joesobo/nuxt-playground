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
		<p v-if="error" class="mt-2 font-bold text-red-500">
			{{ error }}
		</p>
		<div class="mt-2 flex">
			<Button gradient="cyan-blue" @click="addTodo"> Add </Button>
			<Button gradient="purple-pink" outline class="ml-2" @click="resetForm">
				Clear
			</Button>
		</div>

		<!-- Display -->
		<ul class="mt-8 flex flex-col pl-0">
			<Card
				v-for="todo in todos"
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
							label="Todo Checkbox"
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
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { Button, TheCard as Card, Input } from 'flowbite-vue'

import {
	ADD_TODO,
	DELETE_TODO,
	UPDATE_TODO,
} from '../graphql/mutations/todoMutations'
import { GET_TODOS } from '../graphql/queries/todoQueries'
import { pickTextColorBasedOnBgColorAdvanced } from '../utils/colorPicker'
import { Todo, todoSchema, validateTodos } from '../utils/todoTypes'
import Textarea from '~/components/Textarea.vue'
import Checkbox from '~/components/Checkbox.vue'

definePageMeta({
	layout: 'user',
	middleware: ['auth'],
})

// Vue var setup
const todoTitle = ref('')
const todoDescription = ref('')
const todoColor = ref('#000')
const todoChecked = ref(false)
const error: Ref<string | undefined> = ref(undefined)
const storeTodo: Ref<Todo | undefined> = ref(undefined)

// Fetching Data
const { data, refresh } = await useAsyncQuery(GET_TODOS)

const todos = computed(() => validateTodos(data.value?.todosGQL))

const { mutate: addTodoGQL } = useMutation(ADD_TODO, () => ({
	variables: {
		title: todoTitle.value,
		description: todoDescription.value,
		completed: todoChecked.value,
		color: todoColor.value,
	},
	update: () => {
		refresh()
	},
}))
const { mutate: updateTodoGQL } = useMutation(UPDATE_TODO, () => ({
	update: () => {
		refresh()
	},
}))
const { mutate: deleteTodoGQL } = useMutation(DELETE_TODO, () => ({
	update: () => {
		refresh()
	},
}))

// Validate Input
watch([todoTitle, todoDescription, todoChecked, todoColor], () => {
	const todo = {
		title: todoTitle.value,
		description: todoDescription.value,
		completed: todoChecked.value,
		color: todoColor.value,
	}

	// Validate Data
	const parse = todoSchema.safeParse(todo)

	if (parse.success) {
		error.value = undefined
	} else {
		const issue = parse.error.issues[0]

		if (
			issue?.code === 'too_small' ||
			issue?.code === 'too_big' ||
			issue?.code === 'invalid_string'
		) {
			error.value = `${issue.path[0]}: ${issue.message}`
			return
		}

		error.value = JSON.stringify(parse.error.issues[0])
	}
})

// Creating Data
const addTodo = async () => {
	if (!error.value) {
		await addTodoGQL()
	}
}

// Updating Data
const updateTodo = async (todo: Todo) => {
	storeTodo.value = todo
	await updateTodoGQL({
		id: todo.id,
		title: todo.title,
		description: todo.description,
		completed: todo.completed,
		color: todo.color,
	})
}

// Deleting Data
const removeTodo = async (todo: Todo) => {
	storeTodo.value = todo
	await deleteTodoGQL({
		id: todo.id,
	})
}

// Reset Form
const resetForm = () => {
	todoTitle.value = ''
	todoDescription.value = ''
	todoChecked.value = false
	todoColor.value = '#000'

	error.value = undefined
}
</script>
