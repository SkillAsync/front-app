<script  setup lang="ts">
import { RouterView } from 'vue-router'
import { useGetAllServices } from '@/graphql/querys/useGetAllServices';
import { useGetAllUsers } from './graphql/querys/useGetAllUsers';

const { services } = useGetAllServices();



</script>
<template>
  <!-- Se coloca el RouterView para que se renderice el componente que corresponda segun la ruta-->
<RouterView></RouterView>
</template>

<style scoped></style>