import { getClient } from '../../graphql/client'
import { ADD_TASK } from '../../graphql/task/mutation'
import { addTodo } from '../../store/task/task.reducer'

export const addTask = (task: { name: string; active: boolean }): any => async (
  dispatch: any,
  getState: any
) => {
  const client = getClient()

  await client.mutate({
    mutation: ADD_TASK,
    variables: { task },
    fetchPolicy: 'no-cache'
  })

  dispatch(addTodo({ todo: task }))
}
