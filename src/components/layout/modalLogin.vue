<script setup lang="ts">
import modalComponent from '@/components/shared/modalComponent.vue'
import { useMutateLogin } from '@/graphql/mutations/useMutateLogin';
import type { objectInput } from '@/types/objectInput';
import { ref } from 'vue';

const props = defineProps<{ open: boolean }>();
const error = ref<string>('')

const { login, onError } = useMutateLogin()

onError(({ graphQLErrors }) => {
    // graphQLErrors es un array de errores devueltos por GraphQL
    graphQLErrors.forEach((err) => {
        console.error(err.message);
        error.value = err.message; 
    });
});

const inputs: Array<objectInput> = [
    {
        type: 'text',
        name: 'username',
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

const emit = defineEmits(['closeModal']);
const closeModal = () => emit('closeModal', props.open);

const loginFunction = async (data: object) => {
    try {
        if (Object.values(data).some(value => !value.value.trim())) {
            error.value = 'Todos los campos son requeridos'
            return
        }

        const dataTransform = Object.keys(data).reduce((acc, key) => {
            acc[key] = data[key].value.trim()
            return acc
        }, {})
        const response = await login(dataTransform)
        const { data: { login: { access_token ,user } } } = response
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
        console.error(error);
    }
}

</script>

<template>
    <modalComponent :error="error" header="Iniciar sesión" action="Iniciar sesión" action2="Registrarse"
        :inputs="inputs" :open="props.open" image="src/assets/images/image-login.jpg" @closeModal="closeModal"
        @handleSubmit="loginFunction" />
</template>

<style lang="scss" scoped>

</style>
