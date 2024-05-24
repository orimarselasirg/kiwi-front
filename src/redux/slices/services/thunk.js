import { api } from '../../../services'

export const validateBack = (id, placa) => {
  return async (dispatch) => {
    const { data } = await api.post('/clientsandlicenses/', {
      identification: id,
      license_plate: placa
    })
    return data
  }
}

export const sendService = (info) => {
  return async (dispatch) => {
    const { data } = await api.post('/services', info) // validar si la data es necesaria retornarla
    return data
  }
}
