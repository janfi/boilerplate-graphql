import React, { useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/client'

import TaskElement from './taskElement'
import { Task } from '../../../models/task.model'
import { useDispatch, useSelector } from 'react-redux'

import { getTasks } from '../../../services/task/get-tasks'
import {
  currentListTodos,
  initTodos,
  loadingTodos
} from '../../../store/task/task.selectors'

export function TaskList() {
  const todos = useSelector(currentListTodos)
  const init = useSelector(initTodos)
  const loading = useSelector(loadingTodos)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasks())
  }, [])

  if (!init && loading) return <p>Loading ...</p>

  // if (error) return <p>An error occured while loading the tasks !</p>

  return (
    <ul id="todos" className="todos" aria-label="List of to do tasks">
      {todos.map((task: Task) => (
        <TaskElement task={task} key={task.id} />
      ))}
    </ul>
  )
}
