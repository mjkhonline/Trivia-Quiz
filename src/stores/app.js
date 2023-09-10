import {defineStore} from "pinia"
import {ref} from "vue"

export const useAppStore = defineStore('app', ()=> {
    const steps = [
        'category-selection',
        'questioning',
        'result'
        ]

    const currentStep = ref(steps[0])

    function goToQuestioningStep() {
        this.currentStep = steps[1]
    }

    function goToResultStep() {
        this.currentStep = steps[2]
    }


    return { currentStep, goToQuestioningStep, goToResultStep }
})
