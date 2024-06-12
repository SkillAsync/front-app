<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import headerComponent from '@/components/layout/headerComponent.vue';
import footerComponent from '@/components/layout/footerComponent.vue';
import loaderComponent from '@/components/shared/loaderComponent.vue';
import freenlacerCard from '@/components/cards/freenlacerCard.vue';
import errorComponent from '@/components/shared/errorComponent.vue';
import buscadorComponent from '@/components/layout/buscadorComponent.vue'
import paginadorComponent from '@/components/layout/paginadorComponent.vue'
import { useGetAllServices } from '@/graphql/querys/useGetAllServices';

const currentPage = ref(1)

const { services, paginatorInfo, loading, error } = useGetAllServices(currentPage)

const updatePage = (page) => {
    currentPage.value = page
    services.value = []
}

watchEffect(() => {
    if (services.value.length > 0) {
        window.scrollTo(0, 0)
    }

})
</script>

<template>
    <headerComponent />
    <div class="margin-top-100">
        <buscadorComponent></buscadorComponent>
    </div>
    <div class="p-4">
        <p class="text-3xl font-bold text-gray-400">
            Lista de freelancers
        </p>
    </div>
    <main class="bg-gray-100 flex flex-col items-start justify:start min-h-screen p-4">
        <loaderComponent :isLoading="loading" />
        <div v-if="error && !loading" class="w-full h-full flex flex-col items:center justify:center">
            <errorComponent to="/freelancers" messageRedirect="Reiniciar página" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full" v-else>
            <freenlacerCard v-for="(service, index) in services" :key="index" :first_name="service.title"
                :image="service.image" :uuid="service.user.uuid" :description="service.description" />
        </div>
        <div class="w-full flex justify-center mt-4">
            <paginadorComponent :paginatorInfo="paginatorInfo" @update:page="updatePage"></paginadorComponent>
        </div>
    </main>

    <footerComponent />

</template>

<style scoped>
.margin-top-100 {
    margin-top: 100px;
}
.mt-4 {
    margin-top: 1rem;
}
</style>
