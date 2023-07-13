import { createSelector } from 'reselect'
import _debug from 'debug'
const debug = _debug('todos-reducer')

export const selectTodos = (state: any) => state.todos

export const currentTodos = selectTodos

export const currentTodosCount = createSelector(
  currentTodos,
  todos => todos.countActive
)

export const currentTodosStatus = createSelector(
  currentTodos,
  todos => todos.status
)

export const isActiveStatus = createSelector(currentTodos, todos => {
  if (todos.status === 'active') return true
  else if (todos.status === 'completed') return false
  else return undefined
})
