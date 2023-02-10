import { inferAsyncReturnType } from '@trpc/server'

import { prisma } from '../prisma'

export const createContext = () => {
	return {
		prisma,
	}
}

export type Context = inferAsyncReturnType<typeof createContext>
