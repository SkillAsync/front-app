<script setup lang="ts">
import { ref } from 'vue'
import headerComponent from '@/components/layout/headerComponent.vue';
import footerComponent from '@/components/layout/footerComponent.vue';
import loaderComponent from '@/components/shared/loaderComponent.vue';
import freenlacerCard from '@/components/cards/freenlacerCard.vue';
import errorComponent from '@/components/shared/errorComponent.vue';
import buscadorComponent from '@/components/layout/buscadorComponent.vue'
import paginadorComponent from '@/components/layout/paginadorComponent.vue'
import { useGetAllServices } from '@/graphql/querys/useGetAllServices';

const currentPage = ref(1)
const { services, paginatorInfo, loading, error } = useGetAllServices(currentPage.value)

const updatePage = (page) => {
    currentPage.value = page

}


</script>

<template>
    <headerComponent />
    <buscadorComponent></buscadorComponent>
    <div class="p-4">
        <p class="text-3xl font-bold text-gray-400">
            Lista de freelancers
        </p>
    </div>
    <h1>
        {{ currentPage }}
    </h1>
    <main class="bg-gray-100 flex items-start justify:start min-h-screen p-4">
        <loaderComponent :isLoading="loading" />
        <div v-if="error && !loading" class="w-full h-full flex flex-col items:center justify:center">
            <errorComponent to="/freelancers" messageRedirect="Reiniciar página"/>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full" v-else>
            <freenlacerCard v-for="(service, index) in services" :key="index" :first_name="service.title" :image="service.image"  />
        </div>
        <paginadorComponent 
          :paginatorInfo="paginatorInfo"
          @update:page="updatePage"
        ></paginadorComponent>
    </main>
</template>
