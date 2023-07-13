import React, { useEffect, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'

import TaskElement from './taskElement'
import { Task } from '../../shared/custom-types'
import { useDispatch, useSelector } from 'react-redux'

import { isActiveStatus } from '../../store/task/task.selectors'
import { GET_TASKS } from '../../graphql/task/query'
import { setCount } from '../../store/task/task.reducer'

export function TaskList() {
  const [todos, setTodos] = useState([])

  const isActive = useSelector(isActiveStatus)

  const dispatch = useDispatch()

  const { loading, error, data, refetch } = useQuery(GET_TASKS, {
    variables: {
      order: 'reverse:createdAt'
    },
    onCompleted: (data: any) => {
      //console.log(data.task.filter((todo: any) => !!todo.active).length)
      dispatch(
        setCount({
          count:
            (data && data.task.filter((todo: any) => !!todo.active).length) ?? 0
        })
      )
      setTodos((data && data.task) ?? [])
    }
  })

  console.log('todos', todos)
  const currentTodos = todos.filter((todo: any) =>
    isActive !== undefined ? todo.active === isActive : true
  )

  // useEffect(() => {
  //   dispatch(
  //     setCount({
  //       count:
  //         (data && data.task.filter((todo: any) => !!todo.active).length) ?? 0
  //     })
  //   )
  // }, [data])

  if (!data && loading) return <p>Loading ...</p>

  // if (error) return <p>An error occured while loading the tasks !</p>

  return (
    <ul id="todos" className="todos" aria-label="List of to do tasks">
      {currentTodos.map((task: Task) => (
        <TaskElement task={task} key={task.id} reloadList={refetch} />
      ))}
    </ul>
  )
}
