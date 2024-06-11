import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const UPDATE_USER_MUTATION = gql`
    mutation UpdateUser($uuid: String!, $input: UpdateUserInput!) {
        updateUser(uuid: $uuid, input: $input) {
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

interface UpdateUserInput {
    first_name?: String
    last_name?: String
    email?: String
    phone?: String
    avatar?: String
    city?: String
    bio?: String
}

export const useMutateUpdateUser = () => {
    const { mutate: updateUser, onDone, onError } = useMutation(UPDATE_USER_MUTATION)

    const updateUserHandler = async (uuid: String, input: UpdateUserInput) => {
        console.log('Inputs:3', input);
        console.log('UUID:3', uuid);
        const response = await updateUser({ uuid, input })

        return response
    }

    return {
        updateUser: updateUserHandler,
        onDone,
        onError
    }
}
