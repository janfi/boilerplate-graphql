import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import todos from './task/task.reducer'
import thunk from 'redux-thunk'
import { todosMiddleware } from './task/task.middleware'

const rootReducer = combineReducers({ todos })

const store = createStore(
  rootReducer,
  {}, // default state
  applyMiddleware(thunk, todosMiddleware)
)

export type RootState = ReturnType<typeof rootReducer>

export default store
