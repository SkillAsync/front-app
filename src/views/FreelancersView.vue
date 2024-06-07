<script setup lang="ts">
import headerComponent from '@/components/layout/headerComponent.vue';
import footerComponent from '@/components/layout/footerComponent.vue';
import loaderComponent from '@/components/shared/loaderComponent.vue';
import freenlacerCard from '@/components/cards/freenlacerCard.vue';
import errorComponent from '@/components/shared/errorComponent.vue';
import buscadorComponent from '@/components/layout/buscadorComponent.vue'
import paginadorComponent from '@/components/layout/paginadorComponent.vue'
import { useGetAllServices } from '@/graphql/querys/useGetAllServices';
const { services, loading, error } = useGetAllServices()

/*:ultimapagina="services.paginatorInfo.lastPage" :primero="services.paginatorInfo.count"
    :segundo="services.paginatorInfo.currentPage" :status="services.paginatorInfo.hasMorePages" */
    
</script>

<template>
    <headerComponent />
    <buscadorComponent></buscadorComponent>
    <div class="p-4">
        <p class="text-3xl font-bold text-gray-400">
            Lista de freelancers
        </p>
    </div>
    <main class="bg-gray-100 flex items-start justify-start min-h-screen p-4">
        <loaderComponent :isLoading="loading" />
        <div v-if="error && !loading" class="w-full h-full flex flex-col items-center justify-center">
            <errorComponent to="/freelancers" messageRedirect="Reiniciar página"/>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full" v-else>
            <freenlacerCard v-for="(service, index) in services" :key="index" :first_name="service.title"/>
        </div>
    </main>
    <paginadorComponent v-for="(service, index) in services" :key="index" :ultimapagina="service.paginatorInfo.lastPage" :primero="service.paginatorInfo.count"
    :segundo="service.paginatorInfo.currentPage" :status="service.paginatorInfo.hasMorePages"></paginadorComponent>
    <footerComponent />
</template>

<style scoped>
.content {
    background-color: #475f54;
    padding: 20px;
    text-align: center;
    font-family: 'Segoe UI', sans-serif;
    color: #fff;
}

.content h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

.publicaciones-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.publicacion {
    flex: 1 1 calc(33.333% - 20px);
    box-sizing: border-box;
    margin-bottom: 20px;
    border: 1px solid black;
    text-align: center;
    padding: 10px;
}

.publicacion h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.publicacion img {
    max-width: 100%;
    max-height: 300px;
    margin-bottom: 10px;
}

.publicacion p {
    font-size: 0.9rem;
}
</style>
