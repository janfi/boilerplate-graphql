import { createSelector } from 'reselect'
import _debug from 'debug'
const debug = _debug('todos-reducer')

function isActive(status: string) {
  if (status === 'active') return true
  else if (status === 'completed') return false
  else return undefined
}

export const selectTodos = (state: any) => state.todos

export const currentTodos = selectTodos

export const currentListTodos = createSelector(currentTodos, todos => {
  let isActiveStatus = isActive(todos.status)
  if (isActiveStatus !== undefined) {
    return todos.list.filter((todo: any) => todo.active === isActiveStatus)
  } else return todos.list
})

export const currentTodosCount = (onlyActive: boolean) =>
  createSelector(currentTodos, todos =>
    !!onlyActive
      ? todos.list.filter((todo: any) => !!todo.active).length
      : todos.list.length
  )

export const loadingTodos = createSelector(currentTodos, todos => todos.loading)
export const initTodos = createSelector(currentTodos, todos => todos.init)
export const currentTodosStatus = createSelector(
  currentTodos,
  todos => todos.status
)
