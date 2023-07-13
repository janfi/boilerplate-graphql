import _debug from 'debug'
const debug = _debug('todos-reducer')
//
//
//
/**
 * Middleware interacting with the localstorage.
 */
export const todosMiddleware = (store: any) => {
  debug('Todos middleware')

  return (next: any) => (action: any) => {
    if (action.payload) {
      console.log(
        `Todos middleware ${action.type} ${action.payload.operationName ?? ''}`,
        action.payload
      )
    }

    return next(action)
  }
}
