import { configureStore } from '@reduxjs/toolkit'
import patientReducer from './patientSlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    patient: patientReducer,
    user: userReducer
  }
})

export default store