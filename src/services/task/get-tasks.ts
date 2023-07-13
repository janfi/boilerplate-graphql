import { getClient } from '../../graphql/client'
import { GET_TASKS } from '../../graphql/task/query'
import { setLoading, setTodos } from '../../store/task/task.reducer'

function isActive(status: string) {
  if (status === 'active') return true
  else if (status === 'completed') return false
  else return undefined
}

export const getTasks = (): any => async (dispatch: any, getState: any) => {
  const status = getState().todos.status

  console.log('getTasks init', status)
  const wait = setTimeout(() => {
    dispatch(setLoading({ loading: true }))
  }, 500) // affiche loading si vraiment long

  const client = getClient()

  const { data } = await client.query({
    query: GET_TASKS,
    variables: {
      order: 'reverse:createdAt',
      where: {
        active: isActive(status)
      }
    },
    fetchPolicy: 'no-cache' //no-cache > c'est le reducer qui fait office de cache
  })

  clearTimeout(wait)
  console.log('getTasks thunk', data)
  dispatch(setTodos({ todos: data.task })) //TODO au lieu de rcharger tous les todos mettre à jour le store
}
