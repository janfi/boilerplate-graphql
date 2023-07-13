import { getClient } from '../../graphql/client'
import { DELETE_TASK } from '../../graphql/task/mutation'
import { GET_TASKS } from '../../graphql/task/query'
import { deleteTodo } from '../../store/task/task.reducer'
import { getTasks } from './get-tasks'

export const deleteTask = (id: number): any => async (
  dispatch: any,
  getState: any
) => {
  const client = getClient()

  await client.mutate({
    mutation: DELETE_TASK,
    variables: { id },
    fetchPolicy: 'no-cache'
  })

  dispatch(deleteTodo(id))
}
