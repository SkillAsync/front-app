<script setup lang="ts">
import headerComponent from '@/components/layout/headerComponent.vue';
import footerComponent from '@/components/layout/footerComponent.vue';
import { ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

// Variable para guardar los usuarios
const usuarios = ref([]);

// Definir la consulta GraphQL
const { result, loading, error } = useQuery(gql`
query GetAllUsers {
    getAllUsers {
        data {
            first_name
            avatar
            bio
        }
    }
}
`);

// Verificar la consulta
console.log("Consulta iniciada...");

// Verificar cambios en result
watch(result, (newResult) => {
  console.log("Resultado recibido:", newResult);
  if (newResult && newResult.getAllUsers) {
    usuarios.value = newResult.getAllUsers.data;
  }
});

// Manejo de errores
watch(error, (err) => {
  if (err) {
    console.error("Error al obtener los usuarios:", err);
  }
});

console.log("Usuarios:", usuarios);
</script>


<template>
    <headerComponent />
    <div class="content">
        <h1>
            Lista de Usuarios
        </h1>
    </div>

    <div class="publicaciones-container">
       <!-- Itera sobre los usuarios y muestra cada usuario -->
       <div class="publicacion" v-for="(usu, index) in usuarios" :key="index">
            <h2>{{ usu.first_name }}</h2>
            <img :src="usu.avatar" :alt="usu.first_name">
            <p>{{ usu.bio }}</p>
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
