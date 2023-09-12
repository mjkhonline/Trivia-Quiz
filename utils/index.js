export async function fetchData(url) {
    try {
        const response = await fetch(url, {
            method:'GET',
            headers: { Accept: 'application/json' },
            cache: 'default'
        })
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}

export function generateRndColor() {
    function rndCode() {
        const whiteThreshold = 220
        const blackThreshold = 50
        return Math.floor(Math.random() * whiteThreshold + blackThreshold)
    }

    return `rgb(${rndCode()}, ${rndCode()}, ${rndCode()})`
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
