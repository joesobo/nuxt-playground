<template>
	<!-- Form -->
	<div class="flex flex-col">
		<div class="flex">
			<!-- Name -->
			<input
				v-model="todoTitle"
				class="w-full rounded-md border border-solid border-zinc-600 p-2"
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
			<input
				v-model="todoChecked"
				class="ml-2 w-6"
				type="checkbox"
				aria-label="New Todo Checkbox"
			/>
		</div>
		<!-- Description -->
		<textarea
			v-model="todoDescription"
			class="mt-2 rounded-md p-2"
			placeholder="Add a description"
			aria-label="New Todo Description"
		/>
		<p v-if="error" class="mt-2 font-bold text-red-500">
			{{ error }}
		</p>
		<div class="mt-2 flex">
			<button class="rounded bg-zinc-300 px-4 py-2" @click="addTodo">
				Add
			</button>
			<button class="ml-2 rounded bg-zinc-300 px-4 py-2" @click="resetForm">
				Clear
			</button>
		</div>

		<!-- Display -->
		<ul class="mt-8 flex flex-col">
			<li
				v-for="todo in todos"
				:key="todo.id"
				class="mr-2 mt-2 flex flex-col rounded border border-solid border-zinc-500 p-4"
				:class="
					pickTextColorBasedOnBgColorAdvanced(
						todo.color,
						'text-white',
						'text-black'
					)
				"
				:style="`background-color: ${todo.color}`"
			>
				<div class="flex justify-between">
					<div class="flex">
						<input
							v-model="todo.completed"
							type="checkbox"
							aria-label="Todo Checkbox"
							@change="updateTodo(todo)"
						/>
						<input
							v-model="todo.title"
							class="ml-2 bg-transparent"
							aria-label="Todo Title"
							@change="updateTodo(todo)"
						/>
					</div>
					<button class="ml-2" @click="removeTodo(todo)">X</button>
				</div>

				<div>
					<input
						v-model="todo.description"
						class="mt-2 bg-transparent text-sm"
						:class="
							pickTextColorBasedOnBgColorAdvanced(
								todo.color,
								'text-gray-300',
								'text-gray-700'
							)
						"
						aria-label="Todo Description"
						@change="updateTodo(todo)"
					/>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'

import {
	ADD_TODO,
	DELETE_TODO,
	UPDATE_TODO,
} from '../graphql/mutations/todoMutations'
import { GET_TODOS } from '../graphql/queries/todoQueries'
import { pickTextColorBasedOnBgColorAdvanced } from '../utils/colorPicker'
import { Todo, todoSchema, validateTodos } from '../utils/todoTypes'

definePageMeta({
	layout: 'user',
})

// Vue var setup
const todoTitle = ref('')
const todoDescription = ref('')
const todoColor = ref('#000')
const todoChecked = ref(false)
const error: Ref<string | undefined> = ref(undefined)
const storeTodo: Ref<Todo | undefined> = ref(undefined)

// Fetching Data
const { data } = await useAsyncQuery(GET_TODOS)
const todos = validateTodos(data.value?.todosGQL)
console.log(todos)
const { mutate: addTodoGQL } = useMutation(ADD_TODO, () => ({
	variables: {
		title: todoTitle.value,
		description: todoDescription.value,
		completed: todoChecked.value,
		color: todoColor.value,
	},
	refetchQueries: [{ query: GET_TODOS }, 'getTodosGQL'],
}))
const { mutate: updateTodoGQL } = useMutation(UPDATE_TODO, () => ({
	update: (store) => {
		const data = store.readQuery({ query: GET_TODOS }) as { todosGQL: Todo[] }
		const updatedData = data.todosGQL.map((todo) => {
			if (todo.id === storeTodo.value?.id) {
				return {
					...todo,
					title: storeTodo.value?.title,
					description: storeTodo.value?.description,
					completed: storeTodo.value?.completed,
					color: storeTodo.value?.color,
				}
			}
			return todo
		})
		store.writeQuery({ query: GET_TODOS, data: { todosGQL: updatedData } })
	},
}))
const { mutate: deleteTodoGQL } = useMutation(DELETE_TODO, () => ({
	update: (cache) => {
		const data = cache.readQuery({ query: GET_TODOS }) as { todosGQL: Todo[] }
		const updatedData = data.todosGQL.filter(
			(w) => w.id !== storeTodo.value?.id
		)
		cache.writeQuery({ query: GET_TODOS, data: { todosGQL: updatedData } })
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
