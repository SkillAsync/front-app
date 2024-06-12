<script setup lang="ts">
import modalComponent from '@/components/shared/modalComponent.vue'
import type { objectInput } from '@/types/objectInput';
import { useMutateCreateFreelacer } from '@/graphql/mutations/freelacer/useMutateCreateFreelacer';
import { ref } from 'vue';


const props = defineProps<{ open: boolean }>();

const { createFreelancer, onError } = useMutateCreateFreelacer()

onError(({ graphQLErrors }) => {
    graphQLErrors.forEach((err) => {
        console.error(err.message);
        error.value = err.message;
    });
});

const inputs: Array<objectInput> = [
    {
        type: 'textArea',
        name: 'description',
        placeholder: 'description',
        label: 'Descripción',
    },
    {
        type: 'select', 
        name: 'Category',
        placeholder: 'Category',
        label: 'Categoria',
        options: [
            {
                value: 'Marketing',
                label: 'Marketing'
            },
            {
                value: 'Diseño',
                label: 'Diseño'
            }
        ]
    },

]

const emit = defineEmits(['closeModal']);
const closeModal = () => emit('closeModal', props.open);
const error = ref<string>('')


</script>

<template>
    <modalComponent :error="error" header="" action="Dar de alta como Freelancer"
        action2="Ya tengo una cuenta" :inputs="inputs" :open="props.open" image="/src/assets/images/image-register.jpg"
        @closeModal="closeModal" @handleSubmit="createFreelancer" />


</template>


<style scoped></style>