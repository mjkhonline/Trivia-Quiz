<script setup>
import CategorySelection from "@/components/CategorySelection.vue"
import QuestionsSteps from "@/components/QuestionsSteps.vue"
import ResultBox from "@/components/ResultBox.vue"
import { ref, computed } from "vue"

const currentStep = ref('category-selection')
const currentComponent = computed(() => ({
  'category-selection': CategorySelection,
  'questioning': QuestionsSteps,
  'result': ResultBox
}[currentStep.value]))

const selectedCategory = ref({})
const result = ref({})

const bindData = computed(() => ({
  'questioning': {
    category: selectedCategory.value
  },
  'result': {
    category: selectedCategory.value,
    result: result.value
  }
}[currentStep.value]))

function forwardToQuestioningStep(category) {
  selectedCategory.value = category
  currentStep.value = 'questioning'
}

function forwardToResult(res) {
  result.value = res
  currentStep.value = 'result'
}

</script>

<template>
  <main class="relative h-100">
    <component
        :is="currentComponent"
        v-bind="bindData"
        @category-selected="forwardToQuestioningStep"
        @finished="forwardToResult"
    />
  </main>
  <footer class="w-screen fixed bottom-0 py-1 bg-white">
    <div>
      <p class="text-center">Developed by <a href="https://github.com/mjkhonline">
        <span class="text-white bg-black py-1 px-2 trans hover:px-1 transition-all duration-150">mjkhonline</span>
      </a></p>
    </div>
  </footer>
</template>
