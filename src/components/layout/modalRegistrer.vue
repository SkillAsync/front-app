<script setup lang="ts">
import modalComponent from '@/components/shared/modalComponent.vue'
import type { objectInput } from '@/types/objectInput';
import { useMutateCreateUser } from '@/graphql/mutations/useMutateCreateUser'
import { ref } from 'vue';
import Swal from 'sweetalert2'


const props = defineProps<{ open: boolean }>();

const { createUser, onError } = useMutateCreateUser()

onError(({ graphQLErrors }) => {
    graphQLErrors.forEach((err) => {
        console.error(err.message);
        error.value = err.message;
    });
});

const inputs: Array<objectInput> = [
    {
        type: 'text',
        name: 'first_name',
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

        //Primera letra maysuucula
        const name = dataTransform?.first_name.charAt(0).toUpperCase() + dataTransform?.first_name.slice(1)
        closeModal()

        Swal.fire({
            title: 'Bienvenido a SkillAsync',
            html: `<p>Gracias por registrarte en SkillAsync, <strong>${name}</strong></p>`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
        })

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