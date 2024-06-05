<script setup lang="ts">
import { ref, computed } from 'vue';
import type { service } from '@/types/service';
import servicePopularCard from '@/components/cards/servicePopularCard.vue';


const services = ref<service[]>([
    { title: 'Diseño web', description: 'Diseño de páginas web a medida', image: 'diseno-web.jpg' },
    { title: 'Marketing digital', description: 'Estrategias de marketing online', image: 'marketing-digital.jpeg' },
    { title: 'Desarrollo web', description: 'Desarrollo de aplicaciones web', image: 'web-developer.jpeg' },
    { title: 'Desarollador movil', description: 'Desarrollo de aplicaciones moviles', image: 'mobile-development.jpg' },
    { title: 'Desarollador de videjuegos', description: 'Desarrollo de videojuegos para todas las plataformas', image: 'game-development.jpg' },
    { title: 'Desarollador de escritorio', description: 'Desarrollo de aplicaciones de escritorio', image: 'desarollador-escritorio.jpg' }
]);

const currentIndex = ref<number>(0);
const totalSlides = services.value.length;
const slidesToShow = 3;
const slideWidth = 100 / slidesToShow;

const visibleServices = computed(() => {
    let endIndex = (currentIndex.value + slidesToShow) % totalSlides;
    if (endIndex < currentIndex.value) {
        endIndex += totalSlides;
    }
    return services.value.slice(currentIndex.value, endIndex);
});

const nextSlide = () => {
    if (currentIndex.value === totalSlides - slidesToShow) {
        currentIndex.value = 0;
        return;
    }
    currentIndex.value = (currentIndex.value + 1) % totalSlides;
};

const prevSlide = () => {
    if (currentIndex.value === 0) {
        currentIndex.value = totalSlides - slidesToShow;
        return;
    }
    currentIndex.value = (currentIndex.value - 1 + totalSlides) % totalSlides;
};


</script>
<template>
    <div class="relative overflow-hidden">
        <div class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex.value * slideWidth}%)` }">
            <div v-for="(service, index) in visibleServices" :key="index"
                class="relative p-4  rounded-lg shadow-md w-full md:w-auto" :style="{ minWidth: slideWidth + '%' }">
                <servicePopularCard :description="service.description" :title="service.title" :image="service.image" />
            </div>
        </div>
        <button class="absolute top-1/2 transform -translate-y-1/2 left-4 bg-white rounded-full p-2 shadow-md z-10"
            @click="prevSlide">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <button class="absolute top-1/2 transform -translate-y-1/2 right-4 bg-white rounded-full p-2 shadow-md z-10"
            @click="nextSlide">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </div>
</template>

<style scoped>
.transition-transform {
    transition: transform 0.5s ease-in-out;
}
</style>
