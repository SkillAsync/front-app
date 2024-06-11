import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const CREATE_SERVICE_MUTATION = gql`
  mutation Createservice($input: CreateServiceInput!) {
    createservice(input: $input) {
      uuid
    }
  }
`
interface CreateServiceInput {
  title: string
  description: string
  price: string
  image: string 
}

export const useMutateCreateService = () => {
  const { mutate: createService, onDone ,onError} = useMutation(CREATE_SERVICE_MUTATION)

  const createServiceHandler = async (input: CreateServiceInput) => {
    const response = await createService({ input })

    return response
  }

  return {
    createService : createServiceHandler,
    onDone,
    onError
  }
}
