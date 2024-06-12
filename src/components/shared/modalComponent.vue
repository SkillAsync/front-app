<script setup lang="ts">
import type { propsModal } from '@/types/propsModal';
import { buildObject } from '@/utils/buildObject';

const props = defineProps<propsModal>();


const emit = defineEmits(['closeModal', 'handleSubmit']);
const closeModal = () => emit('closeModal', props.open);
const data = props?.inputs ? buildObject(props?.inputs ?? []) : props.data_two ?? {};

const handleSubmit = () => emit('handleSubmit', data);
</script>

<template>
    <div id="crud-modal" tabindex="-1" aria-hidden="true"
        class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full"
        v-if="open">
        <div class="relative w-full max-w-6xl h-full flex items-center justify-center">
            <div class="relative bg-white shadow-lg flex w-full rounded-xl">
                <div class="hidden lg:block lg:w-1/2 bg-cover rounded-l-xl"
                    :style="{ backgroundImage: `url(${props.image})` }">
                </div>
                <div class="w-full lg:w-1/2 flex flex-col justify-center p-8">
                    <div class="absolute top-4 right-4">
                        <button type="button"
                            class="text-gray-400 bg-transparent hover:bg-green-200 hover:text-black rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                            @click="closeModal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <h2 class="text-2xl font-semibold text-gray-700 text-center">{{ props.header }}</h2>
                    <!-- Mensaje en caso de error -->
                    <div v-if="props.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
                        role="alert">
                        <span class="block sm:inline">{{ props.error }}</span>
                    </div>
                    <slot name="header"></slot>

                    <form @submit.prevent="handleSubmit">
                        <div v-for="(input, index) in inputs" :key="index" class="mt-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">{{ input.label }}</label>
                            <input :name="input.name" :placeholder="input.placeholder"
                                class="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                :type="input.type"
                                v-model="data[input.name].value"
                                >
                        </div>
                        <slot
                            name="customInputs"
                        ></slot>
                        <div class="mt-8">
                            <button
                                class="bg-green-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-green-600"
                                type="submit"
                                >{{
                                props.action }}</button>
                        </div>
                    </form>
                    <div class="mt-4 flex items-center justify-between">
                        <span class="border-b w-1/5 md:w-1/4"></span>
                        <a href="#" class="text-xs text-green-500 uppercase">{{ action2 }}</a>
                        <span class="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#crud-modal {
    margin: 0;
    padding: 0;
}

.bg-cover {
    margin: 0;
    padding: 0;
}
</style>
