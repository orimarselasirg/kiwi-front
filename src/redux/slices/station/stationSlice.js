import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  station: []
}

export const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    getStation: (state, action) => {
      state.station = action.payload
    }
  }
})

export const { getStation } = stationSlice.actions
