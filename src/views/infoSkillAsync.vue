<script setup lang="ts">
import headerComponent from '@/components/layout/headerComponent.vue';
import footerComponent from '@/components/layout/footerComponent.vue';
</script>

<template>
  <div>
    <headerComponent />
    <section class="about-content">
      <h1 class="about-title">Acerca de Skill Async</h1>
      <p class="about-description">
        Skill Async es una plataforma innovadora que conecta a freelancers talentosos con usuarios que buscan servicios
        profesionales. Nuestra misión es facilitar la colaboración y el crecimiento mutuo en un entorno amigable y
        confiable.
      </p>
      <p class="about-mission">
        Nuestra Misión:
        <span class="mission-text">
          Ayudar a freelancers a encontrar oportunidades emocionantes y a usuarios a obtener servicios excepcionales.
        </span>

      </p>
      <div id="carta">
        <a href="#" id="carta" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="@/assets/images/card1.jpg" alt="">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>
</a>
      </div>
     <div>
      <a href="#" id="carta" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="@/assets/images/card2.jpg" alt="">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>
</a>

     </div>



      <p class="about-values">
        Nuestros Valores:
      <ul class="values-list">
        <li>Transparencia</li>
        <li>Calidad</li>
        <li>Comunidad</li>
        <li>Innovación</li>
      </ul>
      </p>
    </section>
    <footerComponent />
  </div>
</template>


<style scoped>
#carta{
  display:flex;
  justify-content: space-around;
}


.about-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

.about-description {
  font-size: 16px;
  margin-bottom: 24px;
}

.mission-text {
  font-weight: bold;
}

.values-list {
  list-style-type: disc;
  margin-left: 24px;
}
</style>