import { createSelector } from 'reselect'
import _debug from 'debug'
const debug = _debug('todos-reducer')

export const selectTodos = (state: any) => state.todos

export const currentTodos = selectTodos
//
// actions
//
export const setTodos = (payload: any) => ({
  type: '@@todo/SET_TODOS',
  payload
})

//
//
//
/**
 * Middleware interacting with the localstorage.
 */
export const todosMiddleware = (store: any) => {
  debug('Todos middleware')

  return (next: any) => (action: any) => {
    console.log('Todos middleware', action)
    return next(action)
  }
}
//
//State
//
const initialState = {
  list: []
}

export default (state = initialState, action: any) => {
  console.log('Todos reducers', action)
  switch (action.type) {
    case '@@apollo/QUERY_RESULT':
      if (
        action.payload &&
        action.payload.operationName === 'GetTasks' &&
        action.payload.result.data
      ) {
        return { ...initialState, list: [...action.payload.result.data.task] }
      } else if (
        action.payload &&
        action.payload.operationName === 'GetTasks' &&
        action.payload.result.errors
      ) {
        return initialState
      }
    default:
      return state
  }
}

export const currentListTodos = createSelector(
  currentTodos,
  todos => todos.list
)

export const currentTodosCount = (onlyActive: boolean) =>
  createSelector(currentTodos, todos =>
    !!onlyActive
      ? todos.list.filter((todo: any) => !!todo.active).length
      : todos.list.length
  )
