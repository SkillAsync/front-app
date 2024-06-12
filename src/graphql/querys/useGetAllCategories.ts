import { ref, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import type { Ref } from 'vue'


interface Category {
    uuid: string
    name: string
    slug: string
}

export const useGetAllCategories = () => {
    const categories: Ref<Category[]> = ref([])

    const { result, loading, error } = useQuery(gql`
        query GetAllCategories {
            getAllCategories {
                data {
                    uuid
                    name
                    slug
                }
            }
        }
    `)

        


    watchEffect(() => {
        if (result.value && !loading.value) {
            categories.value = []
            categories.value.push(...result.value.getAllCategories.data)
        }
    })

    return {
        categories,
        loading,
        error
    }
}
