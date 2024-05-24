import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tech: []
}

export const techSlice = createSlice({
  name: 'tech',
  initialState,
  reducers: {
    getTech: (state, action) => {
      state.tech = action.payload
    }
  }
})

export const { getTech } = techSlice.actions
