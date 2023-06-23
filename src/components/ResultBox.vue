<script setup>
import { defineProps } from "vue"

const props = defineProps({
  category: {
    type: Object,
    required: true
  },
  result: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="mx-auto p-16 bg-gray-50 lg:max-w-[60%]">
    <div>
      <h2 class="text-2xl mb-16">Result
        <small class="text-md text-gray-400 block">{{ props.category.name }}</small>
      </h2>
      <p class="text-xl text-cyan-500">Congratulations 🎉,<br />
        You answered
        <b>{{ props.result.score }}</b>
        questions correctly, <span class="text-orange-500">in <b>{{ parseInt(props.result.time) }}</b> seconds!</span></p>
    </div>
  <div class="mt-36">
    <p class="text-gray-400 text-sm">
      Questions are gathered from the following source:
      <a class="text-cyan-800" href="https://opentdb.com" target="_blank">https://opentdb.com</a>
    </p>
  </div>
  </div>
</template>

<style scoped>

</style>
