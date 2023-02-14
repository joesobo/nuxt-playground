import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineVitestConfig({
	test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      './setupTests.ts',
    ],
    includeSource: ['**/*.spec.ts'],
  },
})
