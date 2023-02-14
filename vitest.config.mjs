import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineVitestConfig({
	test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      './setupTests.ts',
    ],
		exclude: [
			'**/e2e/**',
			'**/node_modules/**',
			'**/dist/**',
			'**/cypress/**',
			'**/.{idea,git,cache,output,temp}/**',
			'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
		],
  },
})
