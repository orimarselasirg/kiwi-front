import { api } from '../../../services'
import { getProducts } from './productSlice'

export const getProduct = () => {
  return async (dispatch) => {
    const { data } = await api.get('product')
    dispatch(getProducts(data))
  }
}
