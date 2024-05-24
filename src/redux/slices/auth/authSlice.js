import { createSlice } from '@reduxjs/toolkit'
import { saveState, loadState } from 'utilities/localStorage'
import { forgotPassword, resetPassword, signIn, signUp } from './thunk'
import { toast } from 'react-toastify'

// STATUS (type): idle, success, failed
const initialState = {
  token: loadState('user') || null,
  status: 'idle'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.status = 'success'
      state.token = action.payload.token
      saveState('user', action.payload)
      toast.success('Sesión iniciada con éxito')
    })
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = 'failed'
      toast.error(action.payload)
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      toast.success(action.payload)
      state.status = 'success'
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.status = 'failed'
      toast.error(action.payload)
    })
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.status = 'success'
      toast.success(action.payload)
    })
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.status = 'failed'
      toast.error(action.payload)
    })
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.status = 'success'
      toast.success(action.payload)
    })
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.status = 'failed'
      toast.error(action.payload)
    })
  }
})

export default authSlice
