import { gql } from '@apollo/client/core'

export const ADD_USER = gql`
	mutation register($email: String!, $password: String!) {
		register(email: $email, password: $password) {
			message
			status
		}
	}
`

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			message
			status
		}
	}
`

export const LOGOUT_USER = gql`
	mutation logout {
		logout {
			message
			status
		}
	}
`
