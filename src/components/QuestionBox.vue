<script setup>
import { generateRndColor, shuffleArray, asyncTimeout } from "../../utils"
import {defineProps, computed, ref, watch, reactive} from "vue"

const emit = defineEmits(['result'])
const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})

const resultVisible = ref(false)
const timer = reactive({
  elapsedTime: 100,
  id: null
})
const colors = ref([])

const answers = computed(()=> {
  let list = [
      {
        value: props.question['correct_answer'],
        isCorrect: true
      },
      ...(props.question['incorrect_answers'].map(value => ({
        value,
        isCorrect: false
      })))
  ]
  return shuffleArray(list)
})

watch(() => props.question.question, onUpdateQuestion, {
  immediate: true
})

function onUpdateQuestion() {
  startTimer()
  colors.value = answers.value.map(generateRndColor)
}
function startTimer() {
  if (timer.id === null) {
    timer.id = setInterval(() =>  {
      if (--timer.elapsedTime <= 0) {
        solve({ isCorrect: false })
      }
    }, 100)
  }
}

function stopTimer() {
  clearInterval(timer.id)
  timer.id = null
  timer.elapsedTime = 100
}

async function solve(answer) {
  stopTimer()
  resultVisible.value = true
  await asyncTimeout(3000)
  resultVisible.value = false

  if (answer.isCorrect) {
    emit('result','correct')
  } else {
    emit('result','wrong')
  }
}
</script>

<template>
<div class="relative pb-40">
  <h1 :class="{'text-gray-400' : resultVisible}" class="text-3xl transition-colors duration-150 select-none" v-html="props.question.question" />
  <div class="mt-10 flex justify-between items-center">
    <div
        v-for="(answer, index) in answers"
        :key="answer.value"
        :style="{ backgroundColor: colors[index] }"
        @click="solve(answer)"
        :class="{'hover:scale-110 hover:text-black cursor-pointer': !resultVisible}"
        class="min-h-[150px] w-full mx-3 p-3 transition-all duration-150 text-white flex justify-around items-center">
      <p :class="answer.value.length > 16 ? 'text-md' : 'text-3xl text-center'" v-html="answer.value" />
      <img
          v-if="resultVisible"
          :src="`/${answer.isCorrect ? 'correct' : 'wrong'}.png`"
          :class="answer.isCorrect ? 'w-[48px] h-[48px]' : 'w-[35px] h-[35px]'"
          :alt="`${answer.isCorrect ? 'correct' : 'wrong'} answer`" />
    </div>
  </div>
  <div class="absolute bottom-0 w-full h-[4px]">
    <div class="h-full bg-amber-400 transition-all duration-100" :style="{ width: (timer.elapsedTime) + '%' }"></div>
  </div>
</div>
</template>

<style scoped>

</style>
