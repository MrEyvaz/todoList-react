import { type } from '@testing-library/user-event/dist/type'
import React, { act, useReducer, useState } from 'react'
import './TodoList.css'

function todoReducer(state, action) {
    switch (action.type) {
        case "add":
            return [
                ...state, { id: Date.now(), text: action.text, isEditing: false }
            ]

        case "edit":
            return state.map((todo) => todo.id === action.id ? { ...todo, isEditing: !todo.isEditing } : todo)

        case "update":
            return state.map((todo) => todo.id === action.id ? { ...todo, text: action.newText, isEditing: false } : todo)

        case "delete":
            return state.filter((todo) => todo.id !== action.id)

        case "changeTodo":
            return state.map((todo) => todo.id === action.id ? { ...todo, text: action.newText } : todo)
    }
}

function TodoList() {
    const [state, dispatch] = useReducer(todoReducer, [])
    const [input, setInput] = useState("")

    const handleAddTodo = () => {
        if (!input.trim()) return
        dispatch({ type: "add", text: input })
        setInput('')
        console.log(state);
    }

    const handleEditTodo = (id) => {
        dispatch({ type: "edit", id })
    }

    const handleUpdateTodo = (id, newText) => {
        dispatch({ type: "update", id, newText })
    }

    const handleDeleteTodo = (id) => {
        dispatch({ type: "delete", id })
    }

    const handleChangeTodo = (id, newText) => {
        dispatch({ type: "changeTodo", id, newText })
    }

    return (
        <div className='d-flex'>
            <div className='box-shadow'>
                <h1>Todo-List</h1>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Enter a task' onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleAddTodo()
                    }
                }} />
                <button onClick={handleAddTodo}>Add todo</button>

                <div className='todo-list-container'>
                    <ul>
                        {state.map((todo) => (
                            <li key={todo.id}>
                                {todo.isEditing ? (
                                    <div>
                                        <input type="text" value={todo.text} onChange={(e) => handleChangeTodo(todo.id, e.target.value)} />
                                        <button onClick={() => handleUpdateTodo(todo.id, todo.text)}>Update</button>
                                    </div>
                                ) :
                                    <div className="todo-item">
                                        <span>{todo.text}</span>
                                        <div className="todo-item-actions">
                                            <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
                                            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                        </div>
                                    </div>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TodoList