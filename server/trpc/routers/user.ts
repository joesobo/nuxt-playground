import type { User } from '@prisma/client'
import { z } from 'zod'

import { publicProcedure } from '../trpc'
import { ValidatePrisma } from '~~/server/utils/validatePrisma'

type UserInput = Omit<User, 'id'>

export const userRoutes = {
	getUser: publicProcedure
		.input(
			z
				.object({
					email: z.string(),
				})
				.strict()
		)
		.query(async (req) => {
			const currentUser = await req.ctx.prisma.user.findFirst({
				where: {
					email: req.input.email,
				},
			})

			if (currentUser) {
				const id = currentUser.id
				const email = currentUser.email || ''
				const userName = currentUser.displayName || ''

				return {
					id,
					email,
					userName,
					status: 200,
				}
			} else {
				return {
					id: 0,
					email: '',
					userName: '',
					status: 400,
				}
			}
		}),
	createUser: publicProcedure
		.input(
			z
				.object({
					email: z.string(),
					password: z.string(),
					displayName: z.string().nullable(),
				})
				.strict()
		)
		.mutation(async (req) => {
			await req.ctx.prisma.user.create<ValidatePrisma<UserInput>>({
				data: req.input,
			})

			return {
				message: 'User Registered with Email: ' + req.input.email,
				status: 200,
			}
		}),
	loginUser: publicProcedure
		.input(
			z
				.object({
					email: z.string(),
					password: z.string(),
					displayName: z.string().nullable(),
				})
				.strict()
		)
		.mutation(async (req) => {
			await req.ctx.prisma.user.findFirst({
				where: {
					email: req.input.email,
					password: req.input.password,
				},
			})

			return {
				message: 'User Logged in with Email: ' + req.input.email,
				status: 200,
			}
		}),
	logoutUser: publicProcedure
		.input(
			z
				.object({
					email: z.string(),
				})
				.strict()
		)
		.mutation(async (req) => {
			await req.ctx.prisma.user.findFirst({
				where: {
					email: req.input.email,
				},
			})

			return {
				message: 'User Logged out',
				status: 200,
			}
		}),
}
