const noteTitle = document.querySelector('#note-title')
const lastEdited = document.querySelector('#note-edited')
const noteBody = document.querySelector('#note-body')
const removeButton = document.querySelector('#remove-note')

const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find(note => {
    return note.id === noteId
})

if (!note) {
    location.assign('./index.html')
}

noteTitle.value = note.title
lastEdited.textContent = generateLastEdited(note.updatedAt)
noteBody.value = note.body

noteTitle.addEventListener('input', e => {
    note.updatedAt = moment().valueOf()
    lastEdited.textContent = generateLastEdited(note.updatedAt)
    note.title = e.target.value
    saveNotes(notes)
})

noteBody.addEventListener('input', e => {
    note.updatedAt = moment().valueOf()
    lastEdited.textContent = generateLastEdited(note.updatedAt)
    note.body = e.target.value
    saveNotes(notes)
})

removeButton.addEventListener('click', e => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('./index.html')
})

window.addEventListener('storage', e => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find(note => {
            return note.id === noteId
        })

        if (!note) {
            location.assign('./index.html')
        }
        
        noteTitle.value = note.title
        lastEdited.textContent = generateLastEdited(note.updatedAt)
        noteBody.value = note.body

    }
})