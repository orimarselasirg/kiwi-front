import { configureStore } from '@reduxjs/toolkit'
import {
  authSlice,
  clientSlice,
  serviceSlice,
  stationSlice,
  productSlice,
  techSlice,
  serviceTypeSlice
} from './slices'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    clients: clientSlice.reducer,
    service: serviceSlice.reducer,
    station: stationSlice.reducer,
    tech: techSlice.reducer,
    products: productSlice.reducer,
    typeServices: serviceTypeSlice.reducer
  }
})

export default store
