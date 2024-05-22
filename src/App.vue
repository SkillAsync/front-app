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
  <!-- Se coloca el RouterView para que se renderice el componente que corresponda segun la ruta-->
  
  <RouterView />
</template>

<style scoped></style>
