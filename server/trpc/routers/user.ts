import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { z } from 'zod'

import { publicProcedure } from '../trpc'

export const userRoutes = {
	getUser: publicProcedure.query(() => {
		const auth = getAuth()
		const currentUser = auth.currentUser

		if (currentUser) {
			const uid = currentUser.uid
			const email = currentUser.email || ''
			const userName = currentUser.displayName || ''

			return {
				uid,
				email,
				userName,
				status: 200,
			}
		} else {
			return {
				uid: '',
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
				})
				.strict()
		)
		.mutation(async ({ input }) => {
			const auth = getAuth()
			return await createUserWithEmailAndPassword(
				auth,
				input.email,
				input.password
			)
				.then(() => {
					return {
						message: 'User Registered with Email: ' + input.email,
						status: 200,
					}
				})
				.catch((error) => {
					return {
						message: `${error.code}`,
						status: 400,
					}
				})
		}),
	loginUser: publicProcedure
		.input(
			z
				.object({
					email: z.string(),
					password: z.string(),
				})
				.strict()
		)
		.mutation(async ({ input }) => {
			const auth = getAuth()
			return await signInWithEmailAndPassword(auth, input.email, input.password)
				.then(() => {
					return {
						message: 'User Logged in with Email: ' + input.email,
						status: 200,
					}
				})
				.catch((error) => {
					return {
						message: `${error.code}`,
						status: 400,
					}
				})
		}),
	logoutUser: publicProcedure.mutation(async () => {
		const auth = getAuth()
		return await auth.signOut().then(() => {
			return {
				message: 'User Logged out',
				status: 200,
			}
		})
	}),
}
