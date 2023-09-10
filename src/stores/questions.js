import { defineStore } from "pinia"
import {ref} from "vue"
import {fetchData} from "../../utils"

export const useQuestionsStore = defineStore('questions', () => {
    const categories = ref([])
    const selectedCategory = ref(null)
    const result = ref({
        score: 0,
        time: null
    })
    const numberOfQuestions = ref(2)// 10
    let categoryQuestions = ref([])

    async function fetchCategories() {
        const data  = await fetchData('https://opentdb.com/api_category.php')
        this.categories = data['trivia_categories']
    }

    async function fetchQuestions() {
        const data = await fetchData(`https://opentdb.com/api.php?amount=${this.numberOfQuestions}&category=${selectedCategory?.value?.id}`)
        const { response_code, results } = data
        if (response_code === 0) {
            categoryQuestions.value = results
            return true
        }

        return false
    }


    function updateCategory(category) {
        this.selectedCategory = category
    }

    function setResult({score, time}) {
        this.result = { score, time }
    }

        return { categories, categoryQuestions, selectedCategory, result, setResult, fetchCategories, fetchQuestions, updateCategory, numberOfQuestions }
})
