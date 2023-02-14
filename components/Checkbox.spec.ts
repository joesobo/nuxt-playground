import { fireEvent, render, screen } from '@testing-library/vue'

import Checkbox from './Checkbox.vue'

it('toggles state on click', async () => {
	render(Checkbox, {
		props: {
			label: 'increment',
		},
	})

	const checkbox = screen.getByLabelText('increment')

	expect(checkbox).not.toBeChecked()

	await fireEvent.click(checkbox)

	expect(checkbox).toBeChecked()
})
