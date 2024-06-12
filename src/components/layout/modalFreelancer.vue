<script setup lang="ts">
import modalComponent from '@/components/shared/modalComponent.vue'
import { useMutateCreateFreelacer } from '@/graphql/mutations/freelacer/useMutateCreateFreelacer';
import { useGetAllCategories } from '@/graphql/querys/useGetAllCategories';
import { useAuthStore } from '@/stores/useAuthStore';
import type { CreateFreelancerInput } from '@/types/CreateFreelancerInput';
import { storeToRefs } from 'pinia';

import { ref, watch } from 'vue';

const { user } = storeToRefs(useAuthStore());

interface categoriesInterface {
    uuid: string;
    name: string;
    slug: string;
}

const props = defineProps<{ open: boolean }>();
const dataCategories = ref<categoriesInterface[]>([]);
const { create, onError } = useMutateCreateFreelacer();
const { categories, loading } = useGetAllCategories(); // Aquí asumo que tu hook de consulta devuelve una variable `loading` que indica si la consulta está en curso

const data = ref<CreateFreelancerInput>({
    user: {
        connect: user?.value?.uuid 
    },
    category: {
        connect: ''
    },
    description: '',
});

const error = ref<string>('');
const isLoading = ref<boolean>(false);

onError(({ graphQLErrors }) => {
    graphQLErrors.forEach((err) => {
        console.error(err.message);
        error.value = err.message;
    });
});

watch(categories, (newValue) => {
    dataCategories.value = newValue;
}, {
    immediate: true
});

watch(loading, (value) => {
    isLoading.value = value;
});

const emit = defineEmits(['closeModal']);
const closeModal = () => emit('closeModal', props.open);

const handleSubmit = async () => {
    try {
        isLoading.value = true;
        await new Promise(resolve => setTimeout(resolve, 2000));

        isLoading.value = false;

        if (!data.value.description.trim() || !data.value.category.connect.trim()) {
            error.value = 'Todos los campos son requeridos';
            return;
        }
        await create(data.value);
        console.log('Freelancer creado correctamente');
        error.value = '';
    } catch (err) {
        isLoading.value = false; // Desactivar el loader si hay un error
        error.value = 'Ha ocurrido un problema, intente de nuevo';
    }
};
</script>

<template>
    <modalComponent :error="error" header="" action="Dar de alta como Freelancer" action2="Ya tengo una cuenta"
        :open="props.open" image="/src/assets/images/image-register.jpg" @closeModal="closeModal"
        :data_two="data"
        @handleSubmit="handleSubmit">
        <template #header>
            <p class="text-md font-semibold text-gray-700 text-center">
                Para ser freelancer necesitamos una descripción y su categoría
            </p>
        </template>

        <template #customInputs>
            <div v-if="isLoading.value"
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50">
                <div class="spinner"></div>
            </div>
            <p class="block text-gray-700 text-sm font-bold mb-2 mt-5">
                Descripción
            </p>
            <textarea v-model="data.description"
                class="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"></textarea>

            <p class="block text-gray-700 text-sm font-bold mb-2 mt-5">
                Categoria
            </p>
            <select v-model="data.category.connect"
                class="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none">
                <option value="" disabled selected>Selecciona una categoria</option>
                <option v-for="category in dataCategories" :key="category.uuid" :value="category.uuid">
                    {{ category.name }}
                </option>
            </select>
        </template>
    </modalComponent>
</template>

<style scoped>
.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #333;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
