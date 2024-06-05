<script setup lang="ts">

import modalComponent from '@/components/shared/modalComponent.vue'
import type { objectInput } from '@/types/objectInput';

const props = defineProps<{ open: boolean }>();

const inputs: Array<objectInput> = [
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
]


</script>

<template>
    <modalComponent header="Iniciar sesión" action="Iniciar sesión" action2="Registrarse"
        :inputs="inputs" :open="props.open" image="/src/assets/images/image-login.jpg" />
</template>

<style lang="scss" scoped>

</style>