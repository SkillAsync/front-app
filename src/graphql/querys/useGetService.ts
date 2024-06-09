import { ref, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import type { Ref } from 'vue'
import type { service } from '@/types/service'

export const useGetService = (uuid: Ref<string>) => {
  const service: Ref<service | null> = ref(null)

  const { result, loading, error } = useQuery(
    gql`
      query Getservice($uuid: String!) {
        getservice(uuid: $uuid) {
          uuid
          image
          user {
            uuid
            first_name
          }
          category {
            uuid
            name
          }
          title
          description
          price
        }
      }
    `,
    () => ({ uuid: uuid.value })
  )

  watchEffect(() => {
    if (result.value && !loading.value) {
      service.value = result.value.getservice
    }
  })

  return {
    service,
    loading,
    error
  }
}
