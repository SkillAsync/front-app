<template>
  <headerComponent />

  <div v-if="service" class="service-container">
    <div class="service-card">
      <div class="service-media">
        <img :src="service.image" alt="Imagen del servicio" class="service-image">
      </div>
      <div class="service-info">
        
        <div class="flex items-center">
            <img :src="service.user.avatar" alt="`Foto de `" class="w-10 h-10 rounded-full mr-3">
            <div>
                <h2 class="text-xl font-bold text-gray-800">{{ service.user.first_name }}</h2>
                <p class="text-gray-600">{{ service.category.name }}</p>
            </div>
        </div>
        <h2 class="service-title">Servicio {{ service.title }}</h2>
        <p class="service-category">Categoría: {{ service.category.name }}</p>
        <p class="service-description">{{ service.description }}</p>
        <div class="service-price">Precio: <strong>{{ service.price }} €</strong></div>
        <button class="service-contact-button">Contactar</button>
      </div>
    </div>
  </div>

  <div v-else class="service-loading">
    <p>Cargando...</p>
  </div>

  <h1>Comentarios</h1>
  <div class="comments-container">
<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-end px-4 pt-4">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            <span class="sr-only">Open dropdown</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button>
        <div id="dropdown" class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2" aria-labelledby="dropdownButton">
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li>
            </ul>
        </div>
    </div>
    <div class="flex flex-col items-center pb-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="@/assets/images/image-login.jpg" alt="Bonnie image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        <div class="flex mt-4 md:mt-6">
            <p>
              La película 'La La Land' es un hermoso tributo al amor y a los sueños. Con su cautivadora música y sus impresionantes actuaciones, transporta al espectador a un mundo de romance y nostalgia. La química entre Emma Stone y Ryan Gosling es palpable, y la dirección de Damien Chazelle es magistral. Una obra maestra moderna que deleita los sentidos y conmueve el corazón."
            </p>
        </div>
        


<div class="flex items-center">
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
</div>

    </div>
    
</div>
  </div>

  <footerComponent />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useGetService } from '@/graphql/querys/useGetService'
import type { Service } from '@/types/service'
import headerComponent from '@/components/layout/headerComponent.vue'
import footerComponent from '@/components/layout/footerComponent.vue'

const route = useRoute()
const uuid = ref(route.params.uuid as string)

const { service, loading, error } = useGetService(uuid)
</script>

<style scoped>
.service-container {
  display: flex;
  justify-content: center;
  padding: 50px 0;
  width: 100vw;
  margin-top:80px;
  margin-left:20px;
}

.service-card {
  display: flex;
  max-width: 100%;
  width: 100%;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.service-media {
  flex: 1;
  min-width: 40%;
}

.service-image {
  width: 80%;
  height: auto;
  object-fit: cover;
}

.service-info {
  flex: 2;
  padding: 20px;
}

.service-title {
  margin-bottom: 10px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.service-category,
.service-description,
.service-price {
  margin-bottom: 10px;
  color: #666;
}

.service-contact-button {
  padding: 10px 20px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.service-contact-button:hover {
  background-color: #003d82;
}

.service-loading {
  text-align: center;
  padding: 50px 0;
}

.comments-container {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}

.headerComponent {
  position: relative;
  z-index: 10;
}

.footerComponent {
  position: relative;
  z-index: 10;
}
</style>
