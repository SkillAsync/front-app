<script setup lang="ts">
import headerComponent from '@/components/layout/headerComponent.vue';
import footerComponent from '@/components/layout/footerComponent.vue';
</script>

<template>
  <div>
    <headerComponent />

    <section class="bg-green-700 h-screen flex items-start pt-20">
      <div class="w-full ">
        <div class="container mx-auto px-4 py-16">
          <div class="max-w-4xl mx-auto text-left">
            <h1 class="text-5xl font-bold text-white mb-6">¿Quiénes Somos?</h1>
            <p class="text-xl text-white leading-relaxed">
              Skill Async es la plataforma líder para conectar a freelancers talentosos con usuarios que necesitan
              servicios profesionales de calidad. Nuestra misión es facilitar la colaboración y el crecimiento mutuo en
              un entorno amigable y confiable, creando oportunidades para todos.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-200 py-12">
      <div class="container mx-auto px-4">
        <div class="mt-12">
          <div class="flex flex-wrap -mx-4">
            <div class="w-full md:w-1/2 px-4 mb-8 md:mb-0">
              <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Nuestra Misión</h2>
                <p class="text-gray-600 leading-relaxed">
                  Ayudar a freelancers a encontrar oportunidades emocionantes y a usuarios a obtener servicios
                  excepcionales, fomentando un entorno de trabajo inclusivo y transparente.
                </p>
              </div>
            </div>
            <div class="w-full md:w-1/2 px-4">
              <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Nuestros Valores</h2>
                <ul class="text-gray-600 leading-relaxed">
                  <li class="mb-2"><span
                      class="inline-block bg-green-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">Transparencia</span>
                    Fomentamos la honestidad y la claridad en todas nuestras interacciones.</li>
                  <li class="mb-2"><span
                      class="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">Calidad</span>
                    Buscamos la excelencia en cada servicio ofrecido y experiencia proporcionada.</li>
                  <li class="mb-2"><span
                      class="inline-block bg-yellow-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">Comunidad</span>
                    Creamos y apoyamos una comunidad diversa de profesionales comprometidos.</li>
                  <li class="mb-2"><span
                      class="inline-block bg-purple-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">Innovación</span>
                    Impulsamos la innovación continua para mejorar nuestros servicios y experiencia de usuario.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footerComponent />
  </div>
</template>
