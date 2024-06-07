<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import useModal from '@/composables/useModal';
import modalRegistrer from '@/components/layout/modalRegistrer.vue'
import modalLogin from '@/components/layout/modalLogin.vue'

const { showModal : openRegister, toggleModalState : toogleButtonRegister } = useModal()
const { showModal : openLogin, toggleModalState : toogleButtonLogin } = useModal()

interface itemNav {
    title: string;
    url: string;
}

const itemsNav = ref < itemNav[] > ([
    { title: 'Inicio', url: '/' },
    { title: 'Freelancers', url: '/freelancers' },
    { title: 'Contacto', url: '#' },
    { title: 'Nosotros', url: '/about' },
    { title: 'Perfil', url: '/perfil'}
]);

</script>

<template>
    <modalRegistrer :open="openRegister" @closeModal="toogleButtonRegister" />
    <modalLogin :open="openLogin" @closeModal="toogleButtonLogin" />
    <nav
        class="fixed inset-x-0 top-0 z-10 w-full px-8 py-2 bg-green-700 shadow-md border-b border-slate-500 transition duration-700 ease-out mr-20">
        <div class="flex justify-between items-center p-4">
            <!-- Logo de la empresa -->
            <div class="flex items-center space-x-4 ml-20">
                <h1 class="text-white
                    font-bold text-2xl tracking-tight">SkillAsync</h1>
            </div>
            <!-- Navegación y botones -->
            <div class="flex items-center space-x-6 text-lg font-semibold tracking-tight px-2">
                <RouterLink v-for="item in itemsNav" :key="item.title" :to="item.url"
                    class="text-white hover:shadow-lg hover:bg-green-900 rounded-lg px-2 py-2 transition duration-300">
                    {{ item.title }}
                </RouterLink>
                <div class="flex items-center space-x-2">
                    <button @click="toogleButtonLogin"
                        class="px-4 py-2 text-white transition duration-500 ease-out rounded-lg hover:bg-green-900 hover:text-green-90"
                        type="button">
                        Iniciar sesión
                    </button>
                    <button @click="toogleButtonRegister"
                        class="px-4 py-2 text-white transition duration-500 ease-out rounded-lg border border-white hover:bg-green-900"
                        type="button">
                        Únete
                    </button>
                </div>
            </div>
        </div>
    </nav>


</template>

<style scoped></style>
