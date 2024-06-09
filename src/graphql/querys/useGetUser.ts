
import { ref, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import type { Ref } from 'vue'
import type { user } from '@/types/user'
export const useGetUser = () => {
    const user: Ref<user[]> = ref([])
  
    const { result, loading, error } = useQuery(
      gql`
        query GetUser {
            getUser(uuid: null) {
            uuid
            first_name
            last_name
            email
            phone_country
            phone
            avatar
            country
            city
            bio
    }
}

      `,
    )
  
      watchEffect(() => {
        if ( result.value  && !loading.value ) {
          user.value.slice(0, user.value.length)
          user.value.push(...result.value.getUser.data)
        }
    })
  
    return {
      user,
      loading,
      error
    }
  }
  