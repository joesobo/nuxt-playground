import { router } from '../trpc'
import { todoRoutes } from './todo'

export const appRouter = router({
	...todoRoutes,
})

// export type definition of API
export type AppRouter = typeof appRouter
