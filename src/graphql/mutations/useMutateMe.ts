import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const ME_MUTACION = gql`
  query Me {
    me {
      uuid
      first_name
      last_name
      email
      email_verified_at
      phone_country
      phone
      avatar
      country
      city
      address
      bio
      enabled
    }
  }
`

export const useMutateMe = () => {
  const { mutate , onDone, onError } = useMutation(LOGIN_MUTATION)

}
