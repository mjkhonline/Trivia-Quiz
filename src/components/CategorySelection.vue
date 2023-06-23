<script setup>
import LoadingIndicator from "@/components/LoadingIndicator.vue"
import { generateRndColor } from "../../utils"
import { ref,  onMounted } from "vue"

defineEmits(['category-selected'])

const isLoading = ref(true)
const categories = ref([])

onMounted(()=> {
  fetchCategories()
})

async function fetchCategories() {
 try {
    const response = await fetch('https://opentdb.com/api_category.php', {
      method:'GET',
      headers: { Accept: 'application/json' },
      cache: 'default'
    })
    const data = await response.json()
    categories.value = data['trivia_categories']
    isLoading.value = false
  } catch (e) {
    console.log(e)
  }
}

</script>

<template>
<div class="mx-auto p-16 bg-gray-50 lg:max-w-[60%]">
  <img :src="'/question.gif'" alt="question" class="h-[200px]" />
  <h1 class="my-10 p-2 text-3xl">Which of the following topics are you interested in?</h1>
  <LoadingIndicator v-if="isLoading" />
  <div
      v-else
      v-for="category in categories"
      :key="category.id"
      :style="{ backgroundColor: generateRndColor() }"
      @click="$emit('category-selected', category)"
      class="flex justify-center items-center mx-3 my-3 min-h-[85px] cursor-pointer transition-all duration-150 hover:mx-20">
    <p class="text-2xl text-center top-1/2 text-black">{{ category.name }}</p>
  </div>
</div>
</template>

<style scoped>

</style>
