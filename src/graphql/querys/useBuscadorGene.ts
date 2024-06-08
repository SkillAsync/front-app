import { ref, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import type { Ref } from 'vue'
import type { service } from '@/types/service'

export const useBuscadorGene = (searchTerm: Ref<string>) => {
    const services: Ref<service[]> = ref([])

    const { result, loading, error } = useQuery(
        gql`
            query GetAllservices($generecSearch: String!) {
                getAllservices(generecSearch: $generecSearch) {
                    data {
                        uuid
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
                        image
                    }
                }
            }
        `,
        () => ({ generecSearch: searchTerm.value })
    )

    watchEffect(() => {
        if (result.value && !loading.value) {
            services.value = result.value.getAllservices.data
        }
    })

    return {
        services,
        loading,
        error
    }
}
