import React, { useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/client'

import TaskElement from './taskElement'
import { Task } from '../../shared/custom-types'
import { useDispatch, useSelector } from 'react-redux'

import { isActiveStatus } from '../../store/task/task.selectors'
import { GET_TASKS } from '../../graphql/task/query'

export function TaskList() {
  const isActive = useSelector(isActiveStatus)

  const dispatch = useDispatch()

  const { loading, error, data, refetch } = useQuery(GET_TASKS, {
    variables: {
      order: 'reverse:createdAt',
      where: {
        active: isActive
      }
    }
  })

  if (!data || loading) return <p>Loading ...</p>

  // if (error) return <p>An error occured while loading the tasks !</p>

  return (
    <ul id="todos" className="todos" aria-label="List of to do tasks">
      {data.task.map((task: Task) => (
        <TaskElement task={task} key={task.id} />
      ))}
    </ul>
  )
}
