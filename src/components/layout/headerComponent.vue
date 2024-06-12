<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';
import useModal from '@/composables/useModal';
import modalRegistrer from '@/components/layout/modalRegistrer.vue';
import modalLogin from '@/components/layout/modalLogin.vue';
import modalFreelancer from '@/components/layout/modalFreelancer.vue';
import { useMe } from '@/graphql/querys/useGetMe';

const { showModal: openRegister, toggleModalState: toogleButtonRegister } = useModal();
const { showModal: openLogin, toggleModalState: toogleButtonLogin } = useModal();
const { showModal: openFreelancer, toggleModalState: toogleButtonFreelancer } = useModal();

interface itemNav {
    title: string;
    url: string;
    class?: string;
    icon?: string;
}

const itemsNav = ref<itemNav[]>([
    { title: 'Inicio', url: '/' },
    { title: 'Servicios', url: '/freelancers' },
    { title: 'Contacto', url: '#' },
    { title: 'Nosotros', url: '/about' },
]);

const itemsUser = ref<itemNav[]>([
    {
        title: 'Perfil',
        url: '/perfil',
        icon: 'fas fa-user',
    },
    {
        title: 'Chat',
        url: '/chat',
        icon: 'fas fa-comments',
        class: 'hidden md:block',
    },
]);

const itemsDropdown = ref<itemNav[]>([
    { title: 'Perfil', url: '/perfil' },
    { title: 'Cerrar sesión', url: '/logout' },
]);

const token = localStorage.getItem('access_token');

const user = ref<any>(null);
const { me, loading, error } = useMe();

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.reload();
};

const dropdownVisible = ref(false);

const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value;
};

watchEffect(() => {
    if (me.value) {
        user.value = me.value;
    }
});
</script>

<template>
    <modalRegistrer :open="openRegister" @closeModal="toogleButtonRegister" />
    <modalLogin :open="openLogin" @closeModal="toogleButtonLogin" />
    <modalFreelancer :open="openFreelancer" @closeModal="toogleButtonFreelancer" />
    <nav
        class="fixed inset-x-0 top-0 z-10 w-full px-8 py-2 bg-green-700 shadow-md border-b border-slate-500 transition duration-700 ease-out mr-20">
        <div class="flex justify-between items-center p-4">
            <div class="flex items-center space-x-4 ml-20">
                <h1 class="text-white font-bold text-2xl tracking-tight">SkillAsync</h1>
            </div>
            <div class="flex items-center space-x-6 text-lg font-semibold tracking-tight px-2">
                <RouterLink v-for="item in itemsNav" :key="item.title" :to="item.url"
                    class="text-white hover:shadow-lg hover:bg-green-900 rounded-lg px-2 py-2 transition duration-300">
                    {{ item.title }}
                </RouterLink>
                <div class="flex items-center space-x-2" v-if="!token">
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
                <div class="relative" v-if="token && user">
                    <button id="dropdownAvatarNameButton" @click="toggleDropdown"
                        class="flex items-center text-sm pe-1 font-medium text-white rounded-full dark:hover:text-green-300 md:me-0 focus:ring-4 focus:bg-green-500 focus:ring-opacity-40 dark:focus:bg-green-700"
                        type="button">
                        <span class="sr-only">Open user menu</span>
                        <img class="w-8 h-8 me-2 rounded-full"
                            :src="user.avatar ? user.avatar : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'"
                            alt="avatar">
                        {{ user.first_name.charAt(0).toUpperCase() + user.last_name }}
                        <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <div v-show="dropdownVisible" id="dropdownAvatarName"
                        class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div class="font-medium">Pro User</div>
                            <div class="truncate">{{ user.email }}</div>
                        </div>
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownAvatarNameButton">
                            <li>
                                <RouterLink v-for="item in itemsUser" :key="item.title" :to="item.url">
                                    <a v-if="item.icon"
                                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{
                                        item.title }}</a>
                                </RouterLink>
                            </li>
                            <li @click="toogleButtonFreelancer">
                                <button
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    type="button">
                                    Mode freelancer
                                </button>
                            </li>
                        </ul>
                        <div class="py-2">
                            <button @click="logout"
                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                type="button">
                                <i class="fas fa-sign-out-alt"></i>
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>
