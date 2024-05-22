<script  setup lang="ts">
import { RouterView } from 'vue-router'
import { defineComponent, onMounted } from 'vue'
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';
import { watch } from 'vue';




const { result, loading, error } = useQuery(gql`
   query {
       getAllUsers{
        data {
            uuid
            first_name
          
        }
      }
    }
`);

onMounted(() => {
  console.log(result.value)
})

</script>
<template>
  <RouterView />
</template>

<style scoped></style>
