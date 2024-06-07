import { ref, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import type { Ref } from 'vue'
import type { service } from '@/types/service'

export const useGetAllServices = () => {
  const services: Ref<any[]> = ref([])

  const { result, loading, error } = useQuery(
    gql`
      query GetAllservices {
        getAllservices {
          data {
            image
            user {
              first_name
            }
            category {
              name
            }
            title
            description
          }
          paginatorInfo {
            count
            currentPage
            hasMorePages
            lastPage
        }
        }
      }
    `,
  )

    watchEffect(() => {
      if ( result.value  && !loading.value ) {
        services.value.slice(0, services.value.length)
        services.value.push(...result.value.getAllservices.data)
      }
  })

  return {
    services,
    loading,
    error
  }
}
