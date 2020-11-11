let todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#add-todo-form').addEventListener('submit', e => {
    const text = e.target.elements.newTodo.value.trim()
    console.log(text)
    e.preventDefault()
    if (text.length > 0){
        todos.push({
            id: uuidv4(),
            text, 
            completed: false
        })
        saveTodos(todos)
        e.target.elements.newTodo.value = ''
        renderTodos(todos, filters)
    }
    
})

document.querySelector('#filter-todos-text').addEventListener('input', e => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
    
})

document.querySelector('#hide-completed').addEventListener('change', e => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})