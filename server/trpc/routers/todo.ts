import type { Todo } from '@prisma/client'
import { z } from 'zod'
import { publicProcedure } from '~/server/trpc/trpc'
import { ValidatePrisma } from '~/server/utils/validatePrisma'

type TodoInput = Omit<Todo, 'id'>

export const todoSchema = z
	.object({
		title: z
			.string({
				required_error: 'Title is required',
				invalid_type_error: 'Title must be at least 3 characters',
			})
			.min(3),
		description: z.string().max(50).nullable(),
		color: z
			.union([
				z.string().startsWith('#').length(4),
				z.string().startsWith('#').length(7),
			])
			.nullable(),
		completed: z.boolean(),
	})
	.strict()

export const fullTodoSchema = todoSchema.extend({
	id: z.number(),
	color: z.union([
		z.string().startsWith('#').length(4),
		z.string().startsWith('#').length(7),
	]),
	description: z.string().max(50),
})

type FullTodo = z.infer<typeof fullTodoSchema>

export const todoRoutes = {
	getTodo: publicProcedure
		.input(
			z
				.object({
					id: z.number(),
				})
				.strict()
		)
		.query(async (req) => {
			const todo = await req.ctx.prisma.todo.findFirst({
				where: {
					id: req.input.id,
				},
			})

			return {
				id: todo?.id,
				...todo,
			} as Todo
		}),
	getTodos: publicProcedure.query(async (req) => {
		const todos: FullTodo[] = []

		const result = await req.ctx.prisma.todo.findMany()

		result.forEach((todo) => {
			todos.push({
				...todo,
				color: todo.color || '#000',
				description: todo.description || '',
			})
		})

		return todos
	}),
	addTodo: publicProcedure
		.input(todoSchema.strict() satisfies z.Schema<TodoInput>)
		.mutation(async (req) => {
			await req.ctx.prisma.todo.create<ValidatePrisma<TodoInput>>({
				data: req.input,
			})
		}),
	updateTodo: publicProcedure
		.input(fullTodoSchema.strict() satisfies z.Schema<Todo>)
		.mutation(async (req) => {
			await req.ctx.prisma.todo.update({
				data: req.input,
				where: {
					id: req.input.id,
				},
			})
		}),
	deleteTodo: publicProcedure
		.input(
			z
				.object({
					id: z.number(),
				})
				.strict()
		)
		.mutation(async (req) => {
			await req.ctx.prisma.todo.delete({
				where: {
					id: req.input.id,
				},
			})
		}),
}
