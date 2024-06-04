<script setup lang="ts">
import headerComponent from '@/components/layout/headerComponent.vue';
import footerComponent from '@/components/layout/footerComponent.vue';
import buscadorComponent from '@/components/layout/buscadorComponent.vue';
import { ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

// Variable para guardar las publicaciones
const publicaciones = ref([]);

// Definir la consulta GraphQL
const { result, loading, error } = useQuery(gql`
query GetAllservices {
    getAllservices {
        image
        user {
            first_name
        }
        title
        description
    }
}
`);

// Función que rellena la variable publicaciones
watch(result, (newResult) => {
  console.log(newResult)
  if (newResult && newResult.getAllservices) {
    publicaciones.value = newResult.getAllservices;
  }
});

</script>

<template>
    <headerComponent />
    <buscadorComponent></buscadorComponent>
    <div class="content">
        <h1>
            Lo mejor es SkillAsync para hacer tu negocio
        </h1>
    </div>

    <div class="publicaciones-container">
       <!-- Itera sobre los servicios y muestra cada publicación -->
       <div class="publicacion" v-for="(service, index) in publicaciones" :key="index">
            <h2>{{ service.title }}</h2>
            <img :src="service.image" :alt="service.title">
            <p>{{ service.description }}</p>
        </div>
    </div>
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
