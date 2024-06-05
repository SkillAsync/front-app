<script setup lang="ts">
import modalComponent from '@/components/shared/modalComponent.vue'
import type { objectInput } from '@/types/objectInput';


const props = defineProps<{ open: boolean }>();

const inputs: Array<objectInput> = [
    {
        type: 'text',
        name: 'name',
        placeholder: 'Nombre',
        label: 'Nombre',
    },
    {
        type: 'text',
        name: 'email',
        placeholder: 'Correo',
        label: 'Correo',
    },
    {
        type: 'password',
        name: 'password',
        placeholder: 'Contraseña',
        label: 'Contraseña',
    },
    {
        type: 'password',
        name: 'password_confirmation',
        placeholder: 'Confirmar contraseña',
        label: 'Confirmar contraseña',
    }
]

const emit = defineEmits(['closeModal']);
const closeModal = () => emit('closeModal', props.open);

</script>

<template>
    <modalComponent header="Bievenido al registro de SkilAsync" action="Registrarse" action2="Ya tengo una cuenta"
        :inputs="inputs" :open="props.open" image="/src/assets/images/image-register.jpg" @closeModal="closeModal" />


</template>


<style scoped></style>