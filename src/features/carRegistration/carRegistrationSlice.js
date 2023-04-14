import { createSlice } from '@reduxjs/toolkit'
import { registerCarsData } from '../../helpers/dummyData'

const initialState = {
  registerCars: registerCarsData,
}

export const registerCarsSlice = createSlice({
  name: 'registerCars',
  initialState,
  reducers: {
    registerNewCar: (state, action) => {
        state.registerCars = [...state.registerCars, action.payload]
    },
    updateRegisterCarDetail: (state, action) => {
        const newRecord = state.registerCars.map(car => {
            if (car.id === action.payload.id) { //fetching the perticular object from the array and updating its values
                return action.payload
            }
            return car
        })
        state.registerCars = newRecord
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateRegisterCarDetail, registerNewCar } = registerCarsSlice.actions

export default registerCarsSlice.reducer