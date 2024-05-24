import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  service: []
}

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    addService: (state, action) => {
      state.service = [...state.service, action.payload]
    },
    removeService: (state, action) => {
      state.service = state.service.filter(
        (s) => s.vehicle_id !== action.payload
      )
    },
    updateService: (state, action) => {
      const index = state.service.findIndex((obj) => {
        return obj.vehicle_id === action.payload.vehicle_id
      })
      state.service[index] = action.payload
    }
  }
})

export const { addService, removeService, updateService } = serviceSlice.actions
