<script setup lang="ts">

import type { propsModal } from '@/types/propsModal';

const props = defineProps<propsModal>();


const emit = defineEmits(['closeModal', 'handleSubmit']);
const closeModal = () => emit('closeModal', props.open);

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
                    <a href="#"
                        class="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                        <div class="px-4 py-3">
                            <svg class="h-6 w-6" viewBox="0 0 40 40">
                                <path
                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                    fill="#FFC107" />
                                <path
                                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                    fill="#FF3D00" />
                                <path
                                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                    fill="#4CAF50" />
                                <path
                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                    fill="#1976D2" />
                            </svg>
                        </div>
                        <h1 class="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with Google
                        </h1>
                    </a>
                    <div class="mt-4 flex items-center justify-between">
                        <span class="border-b w-1/5 lg:w-1/4"></span>
                        <a href="#" class="text-xs text-center text-gray-500 uppercase">or login with email</a>
                        <span class="border-b w-1/5 lg:w-1/4"></span>
                    </div>
                    <div v-for="(input,index) in inputs" :key="index" class="mt-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">{{ input.label }}</label>
                        <input  :name="input.name" :placeholder="input.placeholder"  class="focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" :type="input.type">
                    </div>
                    <slot></slot>
                    <div class="mt-8">
                        <button class="bg-green-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-green-600">{{ props.action }}</button>
                    </div>
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
