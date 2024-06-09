<script setup lang="ts">

interface service {
    title: string;
    image: string;
}

const { title, image } = defineProps<service>();

</script>

<template>
    <div class="relative h-40 md:h-64 bg-cover bg-center img"
        :style="{ backgroundImage: `url(/src/assets/images/${image})` }">
        <div class="absolute top-2 left-2 px-2 py-1 rounded-lg">
            <span class="text-white font-bold text-2xl">{{ title }}</span>
        </div>
    </div>
</template>

<style scoped>
</style>