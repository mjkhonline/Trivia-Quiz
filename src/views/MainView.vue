<script setup>
import CategorySelection from "@/components/CategorySelection.vue"
import QuestionsSteps from "@/components/QuestionsSteps.vue"
import ResultBox from "@/components/ResultBox.vue"
import { useAppStore } from "@/stores/app"
import { computed } from "vue"

const app = useAppStore()

const currentComponent = computed(() => ({
  'category-selection': CategorySelection,
  'questioning': QuestionsSteps,
  'result': ResultBox
}[app.currentStep]))

</script>

<template>
  <main class="relative h-100">
    <component :is="currentComponent" />
  </main>
  <footer class="w-screen fixed bottom-0 py-1 bg-white">
    <div>
      <p class="text-center">Developed by <a href="https://github.com/mjkhonline">
        <span class="text-white bg-black py-1 px-2 trans hover:px-1 transition-all duration-150">mjkhonline</span>
      </a></p>
    </div>
  </footer>
</template>
