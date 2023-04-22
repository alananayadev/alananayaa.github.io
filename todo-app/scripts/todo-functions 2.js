'use strict'
//Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (error) {
        return []
    }
}

// Save todos to localStorage
const saveTodos = todos => localStorage.setItem('todos',JSON.stringify(todos))


// Remove todo from list
const removeTodo = id => {
    const todoIndex = todos.findIndex(todo => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Change todo status
const isCompleted = (id, completedTodo) => {
    const todoIndex = todos.findIndex(todo => todo.id === id)
    if (todoIndex > -1) {
        todos[todoIndex].completed = completedTodo
    }
}

// Generate Todo DOM
const generateTodoDOM = todo => {
    const todoElement = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Configure checkbox for todo

    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', e => {
        const completedTodo = e.target.checked
        console.log(completedTodo);
        isCompleted(todo.id, completedTodo)
        saveTodos(todos)
        renderTodos(todos,filters)
    })

    // Add todo content to list
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    // Setup container
    todoElement.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoElement.appendChild(containerEl)

    // Add remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoElement.appendChild(removeButton)
    removeButton.addEventListener('click', e => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoElement
}

// Generate todos summary
const generateSummaryDOM = filteredToDos => {
    const todosLeft = filteredToDos.filter(todo => !todo.completed)
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    const plural = todosLeft.length === 1 ? '' : 's'
    summary.textContent = `You have ${todosLeft.length} todo${plural} left`
    return summary
}

// Render todos list
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos')
    const filteredToDos = todos.filter(todo => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(filteredToDos))

    if (filteredToDos.length > 0){
        filteredToDos.forEach(todo => {
            todoEl.appendChild(generateTodoDOM(todo))
        });
    }else {
        const emptyTodos = document.createElement('p')
        emptyTodos.textContent = 'No to-dos to show'
        emptyTodos.classList.add('empty-message')
        todoEl.appendChild(emptyTodos)
    }
}