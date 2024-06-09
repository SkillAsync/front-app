<template>
  <div>
    <div class="group">
      <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
        <title>Icono de búsqueda</title>
        <!-- SVG content -->
      </svg>
      <input
        v-model="searchTerm"
        @input="handleInput"
        placeholder="Busca servicios o freelancers"
        type="search"
        class="input"
      />
    </div>
    
    <ul v-if="searchTerm.length > 0" class="services-list">
      <div v-if="loading">Loading...</div>
      <li v-if="services.length === 0" class="no-results">No se encontraron resultados</li>
      <li v-for="service in services" :key="service.uuid" class="service-item">
        <h3><RouterLink :to="{ name: 'servicio', params: { uuid: service.uuid } }">{{ service.title }}</RouterLink></h3>
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
.group {
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
}

.input {
  width: 100%;
  height: 40px;
  line-height: 28px;
  padding: 0 1rem;
  padding-left: 2.5rem;
  border: 2px solid;
  border-color: rgba(88, 218, 71, 0.1);
  border-radius: 8px;
  outline: none;
  background-color: #f3f3f4;
  color: #0d0c22;
  transition: .3s ease;
  align-items: center;
}

.input::placeholder {
  color: #a39f9f;
}

.input:focus,
.input:hover {
  outline: none;
  border-color: rgba(196, 210, 220, 0.4);
  background-color: #fff;
  box-shadow: 0 0 0 4px rgba(32, 228, 6, 0.1);
}

.icon {
  position: absolute;
  left: 1rem;
  fill: #dedefe;
  width: 1rem;
  height: 1rem;
}

.services-list {
  margin-top: 1rem;
}

.no-results {
  color: #888;
  font-style: italic;
}

.service-item {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f3f3f4;
}
.service-button {
  background: none;
  border: none;
  padding: 2px;
  font-size: 1rem;
  cursor: pointer;
  transition: box-shadow 0.5s ease;
}

.service-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}
</style>
