const getPuzzle = async (words) => {
    const response = await fetch(`https://puzzle.mead.io/puzzle?wordCount=${words}`)
    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    }else {
        throw new Error('Unable to fetch data')
    }
}

const oldGetPuzzle = (words) => {
    return fetch(`https://puzzle.mead.io/puzzle?wordCount=${words}`).then((response)=> {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('Unable to fetch data')
        }
    }).then((data) => {
        return data.puzzle
    })
}

// const getCountry = countryCode => new Promise((resolve,reject) => {
//     const countryRequest = new XMLHttpRequest()

//     countryRequest.addEventListener('readystatechange', e => {
//         if (e.target.readyState === 4 && e.target.status === 200) {
//             const data = JSON.parse(e.target.responseText)
//             const result = data.find(country => country.alpha2Code === countryCode)
//             resolve(result)
            
//         } else if (e.target.readyState === 4) {
//             reject('Unable to fetch data')
//         }
//     })

//     countryRequest.open('GET', 'http://restcountries.eu/rest/v2/all')
//     countryRequest.send() 
// })
const getCountry = async (countryCode) => {
    const response = await fetch('https://restcountries.eu/rest/v2/all')
    if (response.status === 200) {
        const data = await response.json()
        return data.find(country => country.alpha2Code === countryCode)
    } else {
        throw new Error('Unable to fetch data')
    }
}

const getLocation = async () => {
    const response = await fetch('https://ipinfo.io/json?token=7607f73a498aea')
    if (response.status === 200) {
        return response.json()
    } else {
        throw new Error('Unable to fetch data')
    }
}

const getCurrentCountry = async () => {
    const location = await getLocation()
    return getCountry(location.country)
}
