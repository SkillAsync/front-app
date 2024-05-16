<template>
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


</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.content {
    background-color: #475f54;
    /* Cambia el color de fondo según tu diseño */
    padding: 20px;
    text-align: center;
    font-family: 'Segoe UI', sans-serif;
    /* Utiliza una fuente similar a la de la imagen */
    color: #fff;
    /* Cambia el color del texto según tu diseño */
}

.content h1 {
    font-size: 24px;
    /* Ajusta el tamaño de fuente según tus necesidades */
    margin-bottom: 10px;
}

/*Estilo de las publicaciones*/
.publicaciones-container {
    width: 100%;
}

.publicacion {
    width: 20%;
    margin-right: 2%;
    border: 1px solid black;
    text-align: center;
    /* Espacio entre las publicaciones */
}

.publicacion h2 {
    font-size: 1.2rem;
    /* Otros estilos para el título */
}

.publicacion img {
    max-width: 100%;
    max-height: 300px;
    /* Otros estilos para la imagen */
}

.publicacion p {
    font-size: 0.9rem;
    /* Otros estilos para la descripción */
}
</style>