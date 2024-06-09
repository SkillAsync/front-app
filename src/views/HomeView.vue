<script setup lang="ts">
import BuscadorComponent from '@/components/layout/buscadorComponent.vue';
import headerComponent from '@/components/layout/headerComponent.vue';
import sectionPopularService from '@/components/layout/sectionPopularService.vue';
import footerComponent from '@/components/layout/footerComponent.vue';
</script>


<template>
    <div>
        <headerComponent />
        <main>
            <section class="h-screen flex flex-col md:flex-row justify-between items-center bg-gray-100 px-8">
                <div class="text-left md:w-1/2 space-y-4">
                    <h1 class="text-4xl font-bold">Encuentra Freelancers y Proyectos</h1>
                    <p class="text-lg">La plataforma perfecta para conectar a profesionales con proyectos emocionantes.
                    </p>
                    <div class="w-full max-w-lg">
                        <buscadorComponent />
                        <p>pruebanp</p>
                    </div>
                </div>
                <div class="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                    <img src="@/assets/images/main.avif" alt="Imagen de ejemplo"
                        class="w-3/4 h-auto rounded-lg shadow-md">
                </div>
            </section>
            <section class="p-8 bg-white">
                <h2 class="text-3xl font-bold mb-4 text-gray-400">Servicios Destacados</h2>
                <p class="text-lg mb-8">Explora los servicios más populares y encuentra el freelancer adecuado para tu
                    proyecto.</p>
                <div class="relative overflow-hidden">
                    <sectionPopularService />
                </div>
            </section>
            <section
                class="h-screen flex flex-col md:flex-row justify-between items-center bg-green-500 text-white px-8">
                <div class="text-left md:w-1/2 space-y-4">
                    <h1 class="text-4xl font-bold">Únete a nuestra plataforma</h1>
                    <p class="text-lg">
                        Encuentra freelancers y proyectos emocionantes. Conecta con
                        profesionales que pueden hacer realidad tus ideas.
                    </p>
                    <button
                        class="bg-white text-green-500 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition duration-300">
                        Regístrate ahora
                    </button>
                </div>
                <div class="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                    <img src="/src/assets/images/devops.png" alt="Imagen de ejemplo"
                        class="w-3/4 h-auto rounded-lg shadow-md" />
                </div>
            </section>
        </main>
        <footerComponent />
    </div>
</template>


<style scoped>

</style>