import { ref, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import type { Ref } from 'vue'
import type { paginatorInfo } from '@/types/paginatorInfo'
import type { service} from '@/types/service'


export const useGetAllServices = (page: number) => {
  const services: Ref<service[]> = ref([])
  const paginatorInfo: Ref<paginatorInfo> = ref({
    count: 0,
    currentPage: 0,
    firstItem: 0,
    hasMorePages: false,
    lastItem: 0,
    lastPage: 0,
    perPage: 0,
    total: 0,
  } )

  const { result, loading, error } = useQuery(
    gql`
      query GetAllservices($page: Int!) {
        getAllservices(page: $page) {
          data {
            image
            user {
              uuid
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
      services.value = []
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
