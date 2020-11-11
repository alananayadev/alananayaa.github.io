class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'playing'
    }
    guessLetter(letter) {
        letter = letter.toLowerCase()
        const isUnique = !this.guessedLetters.includes(letter)
        const isBadGuess = !this.word.includes(letter)

        if (isUnique) {
            this.guessedLetters.push(letter)
        }
        if (isUnique && isBadGuess) {
            this.remainingGuesses--
        }

    }
    get puzzle() {
        let puzzle = ''
        this.word.forEach(letter => {
            if (letter === ' ' || this.guessedLetters.includes(letter)) {
                puzzle += letter
            }
            else {
                puzzle += '*'
            }
        })
        return puzzle
    }
    checkStatus() {
        if (!this.puzzle.includes('*')) {
            this.status = 'finished'
        }
        else if (this.remainingGuesses === 0) {
            this.status = 'failed'
        }
    }
    get statusMessages() {
        this.checkStatus()
        switch (this.status) {
            case 'playing':
                return `Guesses left: ${this.remainingGuesses}`

            case 'failed':
                return `Nice try! The word was "${this.word.join('')}".`

            case 'finished':
                return 'Great work! You guessed the word.'

            default:
                break
        }
    }
}




