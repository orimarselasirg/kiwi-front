import { api } from 'services/api.services'

import { createAsyncThunk } from '@reduxjs/toolkit'

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (user, { rejectWithValue }) => {
    try {
      const { email, password } = user
      const { data } = await api.post('/auth/login/', { email, password })
      return { role: data.role, username: data.name, token: data.token }
    } catch (err) {
      return rejectWithValue('La contraseña o el email no coinciden')
    }
  }
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (user, { rejectWithValue }) => {
    try {
      const { name, email, password } = user
      await api.post('/auth/register', { name, email, password })
      return 'Se creo el usuario con éxito'
    } catch (err) {
      return rejectWithValue('El usuario no pude ser creado')
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      await api.put('/auth/forgot-password/', { email })
      return 'Email enviado con éxito'
    } catch (err) {
      console.log(err)
      return rejectWithValue(
        'Oops el email no pudo ser enviado, ¿Hay una cuenta con este correo?'
      )
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/newPassword',
  async (values, { rejectWithValue }) => {
    try {
      const { password, token } = values
      const config = {
        headers: { reset: token }
      }
      await api.put('/auth/new-password/', { newPassword: password }, config)
      return 'Contraseña cambiada con éxito'
    } catch (err) {
      return rejectWithValue('Oops la contraseña no pudo ser cambiada')
    }
  }
)
