import { z } from 'zod'

// Validate the data we send to the server
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

// Validate the data we get from the server
export const todoInputSchema = todoSchema.extend({
	id: z.string(),
	color: z.union([
		z.string().startsWith('#').length(4),
		z.string().startsWith('#').length(7),
	]),
	description: z.string().max(50),
})

export type Todo = z.infer<typeof todoInputSchema>

export const validateTodos = (datum: unknown[]) => {
	if (!datum) return []

	const validTodos: Todo[] = []

	datum.forEach((data: unknown) => {
		const parse = todoInputSchema.safeParse(data)

		if (parse.success) {
			validTodos.push({ ...parse.data, color: parse.data.color || '#000' })
		} else {
			parse.error.issues.forEach((issue) => {
				console.log(issue)
			})
		}
	})
	return validTodos
}
