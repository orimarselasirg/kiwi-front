import { api } from '../../../services'
import { getTypeService } from './serviceTypeSlice'

export const getTypeServices = () => {
  return async (dispatch) => {
    const { data } = await api.get('types')
    dispatch(getTypeService(data))
  }
}
