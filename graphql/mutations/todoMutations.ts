import { gql } from '@apollo/client/core'

export const ADD_TODO = gql`
	mutation addTodoGQL(
		$title: String!
		$description: String!
		$completed: Boolean!
		$color: String!
	) {
		addTodoGQL(
			title: $title
			description: $description
			completed: $completed
			color: $color
		) {
			id
			title
			description
			completed
			color
		}
	}
`

export const DELETE_TODO = gql`
	mutation deleteTodoGQL($id: ID!) {
		deleteTodoGQL(id: $id) {
			id
		}
	}
`

export const UPDATE_TODO = gql`
	mutation updateTodoGQL(
		$id: ID!
		$title: String!
		$description: String!
		$completed: Boolean!
		$color: String!
	) {
		updateTodoGQL(
			id: $id
			title: $title
			description: $description
			completed: $completed
			color: $color
		) {
			id
			title
			description
			completed
			color
		}
	}
`
