import { ref, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import type { Ref } from 'vue'
import type { service } from '@/types/service'

export const useGetAllServices = (page: number) => {
  const services: Ref<any[]> = ref([])
  const paginatorInfo: Ref<any> = ref(null)

  const { result, loading, error } = useQuery(
    gql`
      query GetAllservices($page: Int!) {
        getAllservices(page: $page) {
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
            firstItem
            hasMorePages
            lastItem
            lastPage
            perPage
            total
          }
        }
      }
    `,
    { page },
  )

  watchEffect(() => {
    if (result.value && !loading.value) {
      services.value.slice(0, services.value.length)
      services.value.push(...result.value.getAllservices.data)
      paginatorInfo.value = result.value.getAllservices.paginatorInfo
    }
  })

  return {
    services,
    paginatorInfo,
    loading,
    error
  }
}
