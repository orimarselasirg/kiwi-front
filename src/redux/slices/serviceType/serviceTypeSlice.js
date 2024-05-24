import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  typeService: []
}

export const serviceTypeSlice = createSlice({
  name: 'serviceType',
  initialState,
  reducers: {
    getTypeService: (state, action) => {
      state.typeService = action.payload
    }
  }
})

export const { getTypeService } = serviceTypeSlice.actions
