<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px text-base h-10">
        <li>
          <a href="#" 
             class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
             @click.prevent="prevPage"
             :disabled="!hasPrevPage">Previous</a>
        </li>

        <li v-for="page in totalPages" :key="page">
          <a href="#" 
             class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
             @click.prevent="goToPage(page)">{{ page }}</a>
        </li>

        <li>
          <a href="#" 
            class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click.prevent="nextPage"
            :disabled="!hasNextPage">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits } from 'vue'

const props = defineProps({
  paginatorInfo: Object,
  currentPage: Number
})

const emit = defineEmits(['update:page'])

const totalPages = computed(() => props.paginatorInfo.lastPage)

const nextPage = () => {
  if (props.paginatorInfo.hasMorePages) {
    emit('update:page', props.currentPage + 1)
  }
}

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('update:page', props.currentPage - 1)
  }
}

const goToPage = (page) => {
  emit('update:page', page)
}

const hasNextPage = computed(() => props.paginatorInfo.hasMorePages)
const hasPrevPage = computed(() => props.currentPage > 1)

</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
}
</style>
