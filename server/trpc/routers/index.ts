import { router } from '../trpc'
import { todoRoutes } from './todo'
import { userRoutes } from './user'

export const appRouter = router({
	...todoRoutes,
	...userRoutes,
})

// export type definition of API
export type AppRouter = typeof appRouter
