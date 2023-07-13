import { createSelector } from 'reselect'
import _debug from 'debug'
const debug = _debug('todos-reducer')

//
// actions
//
export const setTodos = ({ todos }: { todos: any[] }) => ({
  type: '@@todo/SET_TODOS',
  payload: { todos }
})

export const addTodo = ({ todo }: { todo: any }) => ({
  type: '@@todo/ADD_TODO',
  payload: { todo }
})

export const updateTodo = ({ todo }: { todo: any }) => ({
  type: '@@todo/UPDATE_TODO',
  payload: { todo }
})

export const deleteTodo = (id: number) => ({
  type: '@@todo/DELETE_TODO',
  payload: { id }
})

export const setLoading = ({ loading }: { loading: boolean }) => ({
  type: '@@todo/SET_LOADING',
  payload: { loading }
})
export const setStatus = ({ status }: { status: string }) => ({
  type: '@@todo/SET_STATUS',
  payload: { status }
})

//
//State
//
const initialState = {
  list: [],
  status: 'all',
  loading: false,
  init: false
}

export default (state = initialState, action: any) => {
  console.log('Todos reducers', action)
  switch (action.type) {
    case '@@todo/SET_TODOS':
      return {
        ...state,
        list: [...action.payload.todos],
        init: true,
        loading: false
      }
    case '@@todo/ADD_TODO': {
      const list = [action.payload.todo]
      return {
        ...state,
        list: [...list, ...state.list],
        init: true,
        loading: false
      }
    }
    case '@@todo/UPDATE_TODO': {
      let list: any[] = [...state.list]
      const updatedTodo = action.payload.todo
      let todoIndex = list.findIndex((todo: any) => todo.id === updatedTodo.id)
      list[todoIndex] = { ...list[todoIndex], ...updatedTodo }
      return {
        ...state,
        list,
        init: true,
        loading: false
      }
    }
    case '@@todo/DELETE_TODO':
      let list: any[] = [...state.list]
      list = list.filter((todo: any) => todo.id !== action.payload.id)
      return {
        ...state,
        list,
        init: true,
        loading: false
      }
    case '@@todo/SET_LOADING':
      return { ...state, loading: action.payload.loading }
    case '@@todo/SET_STATUS':
      return { ...state, status: action.payload.status }
    default:
      return state
  }
}
