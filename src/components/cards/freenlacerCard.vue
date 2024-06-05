<script setup lang="ts">
import type { freelancer } from '@/types/freelancer'
const data = defineProps<freelancer>()
</script>

<template >
    <div class="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <div class="flex items-center">
            <img :src="data.avatar" :alt="`Foto de ${data.first_name}`" class="w-24 h-24 rounded-full mr-4">
            <div>
                <h2 class="text-xl font-bold text-gray-800">{{ data.first_name }}</h2>
                <p class="text-gray-600">Freelancer | Web Developer</p>
            </div>
        </div>
        <div class="mt-4 flex justify-between items-center">
            <span class="text-gray-600 font-semibold">Skills:</span>
            <div class="flex space-x-3">
                <img src="https://via.placeholder.com/20" alt="JavaScript Icon" class="w-6 h-6">
                <img src="https://via.placeholder.com/20" alt="Python Icon" class="w-6 h-6">
            </div>
        </div>
        <div class="mt-4">
            <p class="text-gray-600">{{ data.bio }}</p>
        </div>
        <div class="mt-4 flex justify-end">
            <button
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">Contact</button>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>