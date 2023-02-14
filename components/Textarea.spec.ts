import { fireEvent, render, screen } from '@testing-library/vue'

import Textarea from './Textarea.vue'

it('updates text', async () => {
	render(Textarea, {
		props: {
			label: 'textarea',
			modelValue: '',
		},
	})

	const textarea = screen.getByLabelText('textarea')

	expect(textarea).toHaveValue('')

	await fireEvent.update(textarea, 'Hello World')

	expect(textarea).toHaveValue('Hello World')
})
