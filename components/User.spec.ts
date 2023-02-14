// @vitest-environment nuxt

import { fireEvent, render, screen } from '@testing-library/vue'
import * as app from '#app'
import { vi } from 'vitest'

import User from './User.vue'

let mockUser = {}
const mockClient = {
	auth: {
		signOut: vi.fn(),
	},
}

mockNuxtImport('useSupabaseClient', () => {
	return () => mockClient
})

mockNuxtImport('useSupabaseUser', () => {
	return () => mockUser
})

it('renders the Error when there is no user', () => {
	render(User)

	expect(screen.getByText('Error')).toBeInTheDocument()
})

it('renders the users email', () => {
	mockUser = { id: 1, name: 'John Doe', email: 'jdoe@gmail.com' }

	render(User)

	expect(screen.getByText('jdoe@gmail.com')).toBeInTheDocument()
})

it('renders a logout button that takes you to the login page', async () => {
	vi.spyOn(app, 'navigateTo').mockImplementation(() => {})

	render(User)

	const button = screen.getByText('Sign Out')
	await fireEvent.click(button)

	expect(mockClient.auth.signOut).toHaveBeenCalled()
	expect(app.navigateTo).toHaveBeenCalledWith('/login')
})
