import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const CREATE_FREELACER_MUTATION = gql`
  mutation CreateFreelancer($input: CreateFreelancerInput!) {
    createFreelancer(input: $input) {
      uuid
    }
  }
`
interface CreateFreelancerInput {
  user: {
    connect: string
  }
  category: {
    connect: string
  }
  description: string
}

export const useMutateCreateFreelacer = () => {
  const { mutate: createFreelancer, onDone ,onError} = useMutation(CREATE_FREELACER_MUTATION)

  const createFreelancerHandler = async (input: CreateFreelancerInput) => {
    const response = await createFreelancer({ input })

    return response
  }

  return {
    createFreelancer: createFreelancerHandler,
    onDone,
    onError
  }
}
