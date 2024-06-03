<script setup lang="ts">

//Importo router para hacer push
import { useRouter } from 'vue-router';

const router = useRouter();

interface ErrorComponentProps {
    to: string;
    errorMessage: string;
    messageRedirect: string;
}

const props = withDefaults(defineProps<ErrorComponentProps>(), {
    to: '/',
    errorMessage: 'Ocurrió un error inesperado',
    messageRedirect: 'Volver al inicio'
});
</script>

<template>
    <div class="error-center">
        <div class="error-container">
            <i class="far fa-frown sad-icon"></i>
            <h2 class="blink">{{ props.errorMessage }}</h2>
        </div>
        <div class="button-container">
            <button class="custom-button" @click="router.push(props.to)">{{ props.messageRedirect }}</button>
        </div>
    </div>
</template>

<style scoped>
.error-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.error-container {
    text-align: center;
    animation: fadeIn 1s ease-in-out;
}

.error-container i {
    color: var(--text-color);
}

.sad-icon {
    font-size: 5em;
    animation: shake 0.8s ease infinite;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25%,
    75% {
        transform: translateX(-10px);
    }

    50% {
        transform: translateX(10px);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

/* Estilos para los botones */
.button-container {
    text-align: center;
    margin-top: 20px;
    animation: slideIn 1s ease-in-out;
}

@keyframes slideIn {
    from {
        transform: translateY(50px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.custom-button {
    display: inline-block;
    padding: 10px 20px;
    margin: 0 10px;
    text-decoration: none;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1.2em;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

.custom-button:hover {
    background-color: #2980b9;
}

.custom-button:focus {
    outline: none;
}

h2 {
    color: var(--text-color);
    margin-top: 20px;
    font-size: 1.5em;
}

.blink {
    animation: blink 1s linear infinite;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}
</style>
