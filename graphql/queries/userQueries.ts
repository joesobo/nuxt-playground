import { gql } from '@apollo/client/core'

export const GET_USER = gql`
	query getUser {
		getUser {
			status
			uid
			email
			userName
		}
	}
`
