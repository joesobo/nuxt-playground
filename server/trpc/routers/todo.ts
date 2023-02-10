import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
} from 'firebase/firestore'
import { z } from 'zod'

import { Todo, todoInputSchema, todoSchema } from '../../../utils/todoTypes'
import { db } from './../../firebase'
import { publicProcedure } from '~/server/trpc/trpc'

export const todoRoutes = {
	getTodo: publicProcedure
		.input(
			z
				.object({
					id: z.string(),
				})
				.strict()
		)
		.query(async ({ input }) => {
			const todo = await getDoc(doc(db, 'todos', input.id))
			return { id: todo.id, ...todo.data() }
		}),
	getTodos: publicProcedure.query(async () => {
		const todos: Todo[] = []

		const todosQuery = query(collection(db, 'todos'))
		const todosSnapshot = await getDocs(todosQuery)

		todosSnapshot.forEach((doc) => {
			const parse = todoSchema.safeParse(doc.data())

			if (parse.success) {
				todos.push({
					id: doc.id,
					...parse.data,
					description: parse.data.description || '',
					color: parse.data.color || '#000',
				})
			} else {
				parse.error.issues.forEach((issue) => {
					console.log(issue)
				})
			}
		})
		return todos
	}),
	addTodo: publicProcedure.input(todoSchema).mutation(async ({ input }) => {
		try {
			const docRef = await addDoc(collection(db, 'todos'), input)
			console.log('Document written with ID: ', docRef.id)
		} catch (e) {
			console.error('Error adding document: ', e)
		}
	}),
	updateTodo: publicProcedure
		.input(todoInputSchema)
		.mutation(async ({ input }) => {
			await updateDoc(doc(db, 'todos', input.id), {
				title: input.title,
				description: input.description,
				color: input.color,
				completed: input.completed,
			})
		}),
	deleteTodo: publicProcedure
		.input(
			z
				.object({
					id: z.string(),
				})
				.strict()
		)
		.mutation(async ({ input }) => {
			await deleteDoc(doc(db, 'todos', input.id))
		}),
}
