import { gql } from '@apollo/client/core'

export const GET_TODO = gql`
	query getTodoGQL($id: ID!) {
		todoGQL(id: $id) {
			id
			title
			completed
			description
			color
		}
	}
`

export const GET_TODOS = gql`
	query getTodosGQL {
		todosGQL {
			id
			title
			completed
			description
			color
		}
	}
`
