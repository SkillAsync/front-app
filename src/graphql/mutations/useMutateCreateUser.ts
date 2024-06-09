import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      uuid
    }
  }
`
interface CreateUserInput {
  first_name: string
  email: string
  password: string 
}

export const useMutateCreateUser = () => {
  const { mutate: createUser, onDone ,onError} = useMutation(CREATE_USER_MUTATION)

  const createUserHandler = async (input: CreateUserInput) => {
    const response = await createUser({ input })

    return response
  }

  return {
    createUser : createUserHandler,
    onDone,
    onError
  }
}
