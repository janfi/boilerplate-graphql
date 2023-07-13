import React, { KeyboardEvent } from 'react'
import { useMutation } from '@apollo/client'
import { gql } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { addTask } from '../../services/task/add-task'

export default function Form() {
  const dispatch = useDispatch()

  const taskCreate = (task: { name: string; active: boolean }) => {
    dispatch(addTask(task))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && /\S/.test(e.currentTarget.value)) {
      e.preventDefault()
      taskCreate({ name: e.currentTarget.value, active: true })
      e.currentTarget.value = ''
    }
  }

  return (
    <div id="todoMenu1" className="todo-menu-1">
      <button
        id="toggleAll"
        className="toggle-all"
        aria-label="Toggle all to do tasks"
      >
        <span className="rotate">❯</span>
      </button>
      <input
        id="addTodoTextInput"
        className="add-todo-text-input"
        type="text"
        placeholder="What do you need to do?"
        aria-label="Enter to do text"
        autoFocus={false}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
