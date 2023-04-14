import { configureStore } from '@reduxjs/toolkit'
import registerCarsReducer from '../features/carRegistration/carRegistrationSlice'

export const store = configureStore({
  reducer: {
    registerCars: registerCarsReducer,
  },
})