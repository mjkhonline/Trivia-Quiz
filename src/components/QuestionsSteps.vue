<script setup>
import LoadingIndicator from "@/components/LoadingIndicator.vue"
import QuestionBox from "@/components/QuestionBox.vue"
import { reactive, onMounted, computed } from "vue"
import { subtractDates } from "../../utils"
import {useQuestionsStore} from "@/stores/questions"
import {useAppStore} from "@/stores/app"

const { goToResultStep } = useAppStore()
const question = useQuestionsStore()
const { selectedCategory, setResult, fetchQuestions, numberOfQuestions } = question

const state = reactive({
  step: 0,
  score: 0,
  isLoading: true,
  startTime: null
})

const currentQuestion = computed(() => (question.categoryQuestions[state.step]))

onMounted(async () => {
  state.isLoading = true
  await fetchQuestions()
  state.step = 0
  state.isLoading = false
  state.startTime = new Date()
})

function nextQuestion(result) {
  if (result === 'correct') {
    state.score++
  }

  if (++state.step === numberOfQuestions) {
    setResult({
      score: state.score,
      time: subtractDates(state.startTime, new Date())
    })
    goToResultStep()
  }
}


</script>

<template>
  <div class="mx-auto p-16 bg-gray-50 lg:max-w-[60%]">
    <LoadingIndicator v-if="state.isLoading" />
    <div v-else>
      <h2 class="border-l-black border-l-2 pl-2 text-2xl mb-16">Question #{{ state.step + 1 }}
        <small class="text-md text-gray-400 block">{{ selectedCategory.name }}</small>
      </h2>
      <QuestionBox
          @result="nextQuestion"
          :question="currentQuestion" />
    </div>
  </div>
</template>

<style scoped>

</style>
