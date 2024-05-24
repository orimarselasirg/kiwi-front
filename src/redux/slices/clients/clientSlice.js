import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  client: []
}

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    getClient: (state, action) => {
      state.client = action.payload.client
    }
  }
})

export const { getClient } = clientSlice.actions
