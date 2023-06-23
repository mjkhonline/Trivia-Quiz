export function generateRndColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16)
}

export function shuffleArray(arr) {
    const array = [...arr]
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export function asyncTimeout(ms) {
    return new Promise(resolve => setTimeout(() => resolve(),ms))
}

export function subtractDates(date1, date2) {
    return (date2.getTime() - date1.getTime()) / 1000
}
