import { api } from '../../../services'
import { getClient } from './clientSlice'

export const getClients = () => {
  return async (dispatch) => {
    const { data } = await api.get('client')
    dispatch(getClient({ client: data }))
  }
}

export const createClient = (data) => {
  return async (dispatch) => {
    try {
      await api.post('client', data)
    } catch (error) {
      console.log({
        message: 'hubo error al crear cliente'
      })
      return 'hubo un error al cliente, intenta nuevamente'
    }
  }
}

export const relateLicense = (license, identification) => {
  return async (dispatch) => {
    try {
      await api.put('licenseClient', { license_plate: license, identification })
    } catch (error) {
      console.log({
        status: 'Placa no relacionada'
      })
      return 'Hubo un error, la licencia no puedo ser relacionada, intenta nuevamente'
    }
  }
}

export const createLicense = (license) => {
  return async (dispatch) => {
    try {
      await api.post('license', { license_plate: license })
    } catch (error) {
      console.log({
        status: 'Placa no pudo ser creada'
      })
      return 'Hubo un error en la creacion de la placa, intenta nuevamente'
    }
  }
}
