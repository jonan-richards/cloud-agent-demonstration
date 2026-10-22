import { useState } from 'react'
import './App.css'

function App() {
  const [todoText, setTodoText] = useState('')
  const [todos, setTodos] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()
    const text = todoText.trim()
    if (!text) {
      return
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: Date.now(), text, completed: false },
    ])
    setTodoText('')
  }

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const removeTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  return (
    <main className="todo-app">
      <h1>Todo List</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todoText}
          onChange={(event) => setTodoText(event.target.value)}
          placeholder="Add a task"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <button
              type="button"
              className="todo-toggle"
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </button>
            <button
              type="button"
              className="remove-button"
              onClick={() => removeTodo(todo.id)}
              aria-label={`Remove ${todo.text}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
