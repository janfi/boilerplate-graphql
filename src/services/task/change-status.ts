import { setStatus } from '../../store/task/task.reducer'

export const changeStatus = (status: string): any => async (
  dispatch: any,
  getState: any
) => {
  dispatch(setStatus({ status }))

  //dispatch(getTasks())
}
