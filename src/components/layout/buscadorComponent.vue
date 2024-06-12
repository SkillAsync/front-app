<template>
  <div class="p-4">
    <div class="relative">
      <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" viewBox="0 0 24 24">
        <!-- SVG content -->
      </svg>
      <input
        v-model="searchTerm"
        @input="handleInput"
        placeholder="Busca servicios o freelancers"
        type="search"
        class="pl-10 pr-4 py-2 w-full border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
      />
    </div>
    
    <ul v-if="searchTerm.length > 0" class="services-list overflow-auto max-h-60 mt-2">
      <div v-if="loading">Cargando...</div>
      <li v-if="services.length === 0" class="no-results">No se encontraron resultados</li>
      <li v-for="service in services" :key="service.uuid" class="service-item border-b border-gray-800 hover:bg-gray-100">
        <h3 class="text-lg"><RouterLink :to="{ name: 'servicio', params: { uuid: service.uuid } }" class="text-green-500 hover:text-green-600">{{ service.title }}</RouterLink></h3>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBuscadorGene } from '@/graphql/querys/useBuscadorGene'

const searchTerm = ref('')
const { services, loading, error } = useBuscadorGene(searchTerm)

const handleInput = () => {
  // Esto se ejecuta cada vez que el usuario escribe en el campo de búsqueda
  useBuscadorGene(searchTerm.value)
}
</script>
<style scoped>
/* ... tus estilos existentes ... */

/* Estilos adicionales para Tailwind CSS */
.services-list {
  /* Esto añade un scroll si la lista es muy larga */
  max-height: 15rem; /* Ajusta esto según tus necesidades */
  overflow-y: auto;
}

/* Puedes personalizar aún más los estilos según tus preferencias */
</style>
