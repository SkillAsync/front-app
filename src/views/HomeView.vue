<script setup lang="ts">
import headerComponent from '@/components/layout/headerComponent.vue';
import footerComponent from '@/components/layout/footerComponent.vue';


</script>

<template>
    <headerComponent />
    <div class="content">
        <h1>
            Lo mejor es SkillAsync para hacer tu negocio
        </h1>
    </div>

    <div class="publicaciones-container">
        <!-- Tus publicaciones aquí -->
        <div class="publicacion">
            <h2>Titulo Publicacion</h2>
            <img src="../imgs/jack.jpg">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, saepe. Adipisci non nam perferendis nihil
                exercitationem re</p>
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
    width: 100%;
}

.publicacion {
    width: 20%;
    margin-right: 2%;
    border: 1px solid black;
    text-align: center;
}

.publicacion h2 {
    font-size: 1.2rem;
}

.publicacion img {
    max-width: 100%;
    max-height: 300px;
}

.publicacion p {
    font-size: 0.9rem;
}
</style>