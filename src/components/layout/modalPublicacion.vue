<script setup lang="ts">
import modalComponent from '@/components/shared/modalComponent.vue'
import type { objectInput } from '@/types/objectInput';
import { useMutateCreateService } from '@/graphql/mutations/useMutateCreateService'
import { ref } from 'vue';


const props = defineProps<{ open: boolean }>();

const { createService, onError } = useMutateCreateService()

onError(({ graphQLErrors }) => {
    graphQLErrors.forEach((err) => {
        console.error(err.message);
        error.value = err.message;
    });
});

const inputs: Array<objectInput> = [
    {
        type: 'text',
        name: 'title',
        placeholder: 'Título',
        label: 'Título',
    },
    {
        type: 'text',
        name: 'description',
        placeholder: 'Descripción',
        label: 'Descripción',
    },
    {
        type: 'float',
        name: 'price',
        placeholder: 'Precio',
        label: 'Precio',
    },
    {
        type: 'string',
        name: 'image',
        placeholder: 'Imagen',
        label: 'Imagen',
    }
]

const emit = defineEmits(['closeModal']);
const closeModal = () => emit('closeModal', props.open);
const error = ref<string>('')


const register = async (data: object) => {
    try {
        const { password_confirmation, ...rest } = data

        if (Object.values(rest).some(value => !value.value.trim())) {
            error.value = 'Todos los campos son requeridos'
            return
        }

        if (rest.password.value.trim() !== password_confirmation.value.trim()) {
            error.value = 'Las contraseñas no coinciden'
            return
        }

        const dataTransform = Object.keys(rest).reduce((acc, key) => {
            acc[key] = rest[key].value.trim()
            return acc
        }, {})


        await createUser(dataTransform)
        closeModal()

    } catch (_error) {
        console.error(error);
    }
}

</script>

<template>
    <modalComponent :error="error" header="Bievenido al registro de SkilAsync" action="Registrarse"
        action2="Ya tengo una cuenta" :inputs="inputs" :open="props.open" image="/src/assets/images/image-register.jpg"
        @closeModal="closeModal" @handleSubmit="register" />


</template>


<style scoped></style>