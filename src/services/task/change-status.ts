import { getClient } from '../../graphql/client'
import { GET_TASKS } from '../../graphql/task/query'
import { setLoading, setStatus, setTodos } from '../../store/task/task.reducer'
import { getTasks } from './get-tasks'

export const changeStatus = (status: string): any => async (
  dispatch: any,
  getState: any
) => {
  dispatch(setStatus({ status }))

  // dispatch(getTasks())
}
