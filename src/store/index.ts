import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import todos, { todosMiddleware } from '../components/actions'

const store = createStore(
  combineReducers({
    todos
  }),
  {}, // default state
  applyMiddleware(todosMiddleware)
)

export default store
