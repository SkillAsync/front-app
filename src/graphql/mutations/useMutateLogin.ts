import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
        access_token
        user {
                uuid
                first_name
                email
        }
    }
}
`


interface LoginInput {
    username: string
    password: string
}

export const useMutateLogin = () => {
    const { mutate: login, onDone, onError } = useMutation(LOGIN_MUTATION)

    const loginHandler = async (input: LoginInput) => {
            const response = await login({ ...input })
            return response
    }

    return {
        login: loginHandler,
        onDone,
        onError
    }
}
