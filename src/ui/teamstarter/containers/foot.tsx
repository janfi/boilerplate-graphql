import React from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { changeStatus } from '../../../services/task/change-status'
import {
  currentTodosCount,
  currentTodosStatus
} from '../../../store/task/task.selectors'

export default function Foot() {
  const todosCount = useSelector(currentTodosCount(true))
  const todosStatus = useSelector(currentTodosStatus)

  const dispatch = useDispatch()

  const select = (status: string) => {
    dispatch(changeStatus(status))
  }

  return (
    <div id="todoMenu2" className="todo-menu-2">
      <label
        id="todosLeft"
        className="todos-left"
        aria-label="Number of to do tasks left to complete"
      >
        Todos left: {todosCount}
      </label>
      <div id="todoMenu2Buttons" className="todo-menu-2-buttons">
        <button
          id="showAllTodos"
          className={`menu-2-button ${todosStatus === 'all' && 'active'}`}
          aria-label="Show all to do tasks"
          onClick={() => select('all')}
        >
          All
        </button>
        <button
          id="showUncompletedTodos"
          className={`menu-2-button ${todosStatus === 'active' && 'active'}`}
          aria-label="Show active to do tasks"
          onClick={() => select('active')}
        >
          Active
        </button>
        <button
          id="showCompletedTodos"
          className={`menu-2-button ${todosStatus === 'completed' && 'active'}`}
          aria-label="Show completed to do tasks"
          onClick={() => select('completed')}
        >
          Completed
        </button>
      </div>
      <button
        id="deleteCompletedButton"
        className="delete-completed-button"
        aria-label="Clear completed to do tasks"
        style={{ display: 'none' }}
      >
        Clear completed
      </button>
    </div>
  )
}
