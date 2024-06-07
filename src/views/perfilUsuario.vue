<template>
    <!--<headerComponent></headerComponent>-->
    
    <!-- Poner condicional v-if para no mostrar si alguien no está logeado -->
    <section>
      <div role="status"
           class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
        <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
          <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path
              d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
    
        <div class="w-full">
          <div>Bienvenido "nombre de usuario"</div>
          <div>Subir nueva publicación</div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
        <span class="sr-only">Loading...</span>
        
        <div>
          <input type="file" @change="handleFileUpload" />
          <button @click="submitFile">Upload</button>
        </div>
      </div>
    </section>
  
    <footerComponent></footerComponent>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import headerComponent from '@/components/layout/headerComponent.vue';
  import footerComponent from '@/components/layout/footerComponent.vue';
  
  // Variables reactivas
  const selectedFile = ref<File | null>(null);
  const base64Image = ref<string>('');
  
  // Métodos
  function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      selectedFile.value = target.files[0];
      convertToBase64(selectedFile.value);
    }
  }
  
  function convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      base64Image.value = reader.result as string;
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
    };
  }
  
  function submitFile() {
    console.log(base64Image.value);
  }
  </script>
  
  <style scoped></style>
  