import _debug from 'debug'
const debug = _debug('todos-reducer')

//
// actions
//

export const setStatus = ({ status }: { status: string }) => ({
  type: '@@todo/SET_STATUS',
  payload: { status }
})

export const setCount = ({ count }: { count: number }) => ({
  type: '@@todo/SET_COUNT',
  payload: { count }
})
//
//State
//
const initialState = {
  status: 'all',
  countActive: -1
}

export default (state = initialState, action: any) => {
  console.log('Todos reducers', action)
  switch (action.type) {
    case '@@todo/SET_COUNT':
      return { ...state, countActive: action.payload.count }
    case '@@todo/SET_STATUS':
      return { ...state, status: action.payload.status }
    default:
      return state
  }
}
