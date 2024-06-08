import { ref, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import type { Ref } from 'vue'
import type { user } from '@/types/user'

export const useMe = () => {
  const me = ref<any>({})
  const { result, loading, error } = useQuery(gql`
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
  `)

  watchEffect(() => {
    if (result.value && !loading.value) {
      me.value = result.value.me
    }
  })

  return {
    me,
    loading,
    error
  }
}
