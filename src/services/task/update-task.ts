import { getClient } from '../../graphql/client'
import { UPDATE_TASK } from '../../graphql/task/mutation'
import { updateTodo } from '../../store/task/task.reducer'

export const updateTask = (task: {
  id: number
  name?: string
  active?: boolean
  memoDate?: string | Date | null
  memoSent?: boolean
}): any => async (dispatch: any, getState: any) => {
  const client = getClient()

  await client.mutate({
    mutation: UPDATE_TASK,
    variables: { task },
    fetchPolicy: 'no-cache'
  })

  dispatch(updateTodo({ todo: task }))
}
