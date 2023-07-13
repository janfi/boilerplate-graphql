import { getClient } from '../../graphql/client'
import { GET_TASKS } from '../../graphql/task/query'
import { setLoading, setStatus, setTodos } from '../../store/task/task.reducer'
import { getTasks } from './get-tasks'

function isActive(status: string) {
  if (status === 'active') return true
  else if (status === 'completed') return false
  else return undefined
}

export const changeStatus = (status: string): any => async (
  dispatch: any,
  getState: any
) => {
  dispatch(setStatus({ status }))

  dispatch(getTasks())
}
