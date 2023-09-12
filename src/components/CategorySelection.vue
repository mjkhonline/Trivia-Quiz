<script setup>
import LoadingIndicator from "@/components/LoadingIndicator.vue"
import { useQuestionsStore } from "@/stores/questions"
import { useAppStore } from "@/stores/app"
import { generateRndColor } from "../../utils"
import { ref, onMounted } from "vue"

const questions = useQuestionsStore()
const { fetchCategories, updateCategory } = questions
const { goToQuestioningStep } = useAppStore()

const isLoading = ref(true)

onMounted(async ()=> {
  isLoading.value = true
  await fetchCategories()
  isLoading.value = false
})

function selectCategory(category) {
  updateCategory(category)
  goToQuestioningStep()
}

</script>

<template>
<div class="mx-auto p-1 md:p-16 bg-gray-50 lg:max-w-[60%]">
  <img :src="'/question.gif'" alt="question" class="h-[200px]" />
  <h1 class="my-2 md:my-10 p-1 md:p-2 text-xl md:text-3xl">Which of the following topics are you interested in?</h1>
  <LoadingIndicator v-if="isLoading" />
  <div
      v-else
      v-for="category in questions.categories"
      :key="category.id"
      :style="{ backgroundColor: generateRndColor() }"
      @click="selectCategory(category)"
      class="flex justify-center items-center mx-3 my-3 min-h-[60px] md:min-h-[85px] cursor-pointer transition-all duration-150 hover:mx-20">
    <p class="text-xl md:text-2xl text-center top-1/2 text-black">{{ category.name }}</p>
  </div>
</div>
</template>
