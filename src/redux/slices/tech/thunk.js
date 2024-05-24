import { api } from '../../../services'
import { getTech } from './techSlice'

export const getTeches = () => {
  return async (dispatch) => {
    const { data } = await api.get('/tech')
    dispatch(getTech(data))
  }
}
