<script setup>
import LoadingIndicator from "@/components/LoadingIndicator.vue"
import QuestionBox from "@/components/QuestionBox.vue"
import { reactive, onMounted, computed } from "vue"
import { subtractDates } from "../../utils"

const emit = defineEmits(['finished'])

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const numberOfQuestions = 10

const state = reactive({
  step: 0,
  score: 0,
  questions: [],
  isLoading: true,
  startTime: null
})

const currentQuestion = computed(() => (state.questions[state.step]))

onMounted(async () => {
  state.isLoading = true
  await fetchQuestions()
  state.isLoading = false
  state.startTime = new Date()
})

async function fetchQuestions() {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${props.category.id}`, {
      method:'GET',
      headers: { Accept: 'application/json' },
      cache: 'default'
    })
    const { response_code, results } = await response.json()
     if (response_code === 0) {
       state.questions = results
       state.step = 0
     }
  } catch (e) {
    console.log(e)
  }
}

function nextQuestion(result) {
  if (result === 'correct') {
    state.score++
  }

  if (++state.step === numberOfQuestions) {
    emit('finished', {
      score: state.score,
      time: subtractDates(state.startTime, new Date())
    })
  }
}


</script>

<template>
  <div class="mx-auto p-16 bg-gray-50 lg:max-w-[60%]">
    <LoadingIndicator v-if="state.isLoading" />
    <div v-else>
      <h2 class="border-l-black border-l-2 pl-2 text-2xl mb-16">Question #{{ state.step + 1 }}
        <small class="text-md text-gray-400 block">{{ props.category.name }}</small>
      </h2>
      <QuestionBox
          @result="nextQuestion"
          :question="currentQuestion" />
    </div>
  </div>
</template>

<style scoped>

</style>
