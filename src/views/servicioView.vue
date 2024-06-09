<template>
  <div v-if="service">
    <h1>{{ service.title }}</h1>
    <p>Descripción: {{ service.description }}</p>
    <p>Precio: {{ service.price }}</p>
    <p>Usuario: {{ service.user.first_name }}</p>
    <p>Categoría: {{ service.category.name }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useGetService } from '@/graphql/querys/useGetService'
import type { service } from '@/types/service'

// Recoger el parámetro uuid de la URL
const route = useRoute()
const uuid = ref(route.params.uuid as string)

// Utilizar el composable useGetService
const { service, loading, error } = useGetService(uuid)

// Variable para almacenar el servicio
const serviceData = ref<service | null>(null)

watchEffect(() => {
  if (service.value && !loading.value) {
    serviceData.value = service.value  // Ahora es un objeto, no un array
  }
})
</script>

<style scoped>
/* Aquí puedes agregar tus estilos */
</style>
