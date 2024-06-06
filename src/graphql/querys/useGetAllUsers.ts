import { ref, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import type { Ref } from 'vue'
import type { freelancer } from '@/types/freelancer'

export const useGetAllUsers = () => {
  const users: Ref<freelancer[]> = ref([])

  const { result, loading, error } = useQuery(gql`
    query GetAllUsers {
      getAllUsers {
        data {
          first_name
          avatar
          bio
        }
      }
    }
  `)

  watchEffect(() => {
    if (result.value && !loading.value) {
      users.value.slice(0, users.value.length)
      users.value.push(...result.value.getAllUsers.data)
    }
  })

  return {
    users,
    loading,
    error
  }
}
