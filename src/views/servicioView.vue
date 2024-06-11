<template>
  <headerComponent></headerComponent>
 
  <div v-if="service" class="container">
    <div class="card">
      <a>
        <img :src="service.image" alt="Service Image" class="card-image">
      </a>
      <div class="p-5">
        <a>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Servicio {{service.title}}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><strong>Categoría del servicio:</strong> {{service.category.name}}</p>       
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><strong>Descripción del servicio:</strong> {{service.description}}</p>
        <a class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Contactar
          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>

  <footerComponent></footerComponent>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useGetService } from '@/graphql/querys/useGetService'
import type { service } from '@/types/service'
import headerComponent from '@/components/layout/headerComponent.vue';
import footerComponent from '@/components/layout/footerComponent.vue';

// Recoger el parámetro uuid de la URL
const route = useRoute()
const uuid = ref(route.params.uuid as string)

// Utilizar el composable useGetService
const { service, loading, error } = useGetService(uuid)
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  margin-top:100px;
}

.card {
  max-width: 800px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-image {
  margin: 20px 0;
  max-width: 100%;
  height: auto;
}
</style>
