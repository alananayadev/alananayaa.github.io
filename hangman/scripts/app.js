//HTTP (Hypertext Transfer Protocol)
//Request - What do we want to do
//Response - What was actually done

const puzzlEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')
let newGame

window.addEventListener('keypress', e => {
    if (newGame.status === 'playing') {
        const guess = String.fromCharCode(e.charCode)
        newGame.guessLetter(guess)
        render()
    }
})

const render = () => {
    puzzlEl.innerHTML = ''
    guessesEl.textContent = newGame.statusMessages

    newGame.puzzle.split('').forEach(letter => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzlEl.appendChild(letterEl)  
    })
}

const startGame = async () => {
    const puzzle = await getPuzzle('1')
    newGame = new Hangman(puzzle, 5)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()

// getPuzzle('2').then((puzzle) => {
//     console.log(puzzle)
// }).catch((err) => {
//     console.log(`Error: ${err}`)
// })

// getCurrentCountry().then((country) => {
//     console.log(country.name)
// }).catch((error) => {
//     console.log(error)
// })

