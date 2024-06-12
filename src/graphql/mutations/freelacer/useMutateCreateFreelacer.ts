import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

interface CreateFreelancerInput {
  user: {
    connect: string
  }
  category: {
    connect: string
  }
  description: string
}


const CREATE_FREELACER_MUTATION = gql`
  mutation CreateFreelancer($input: CreataFreelancerForUserInput!) {
    createFreelancer(input: $input) {
      uuid
    }
  }
`

export const useMutateCreateFreelacer = () => {
  const { mutate: createFreelancer, onDone, onError } = useMutation(CREATE_FREELACER_MUTATION)

  const create = async (input: CreateFreelancerInput) => {
    await createFreelancer({ input })
    
  }

  return { create, onDone, onError }

}
