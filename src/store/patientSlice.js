import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activePatient: null,
  patientHistory: []
}

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setActivePatient: (state, action) => {
      // Don't add duplicate entries to history
      if (!state.activePatient || state.activePatient.id !== action.payload.id) {
        // Add current patient to history if it exists
        if (state.activePatient) {
          // Keep only unique patients in history
          if (!state.patientHistory.some(p => p.id === state.activePatient.id)) {
            state.patientHistory = [state.activePatient, ...state.patientHistory.slice(0, 4)]
          }
        }
      }
      state.activePatient = action.payload
    },
    updateActivePatient: (state, action) => {
      state.activePatient = { ...state.activePatient, ...action.payload }
      // Update the same patient in history if exists
      state.patientHistory = state.patientHistory.map(p => 
        p.id === action.payload.id ? { ...p, ...action.payload } : p
      )
    },
    clearActivePatient: (state) => {
      state.activePatient = null
    }
  }
})

export const { setActivePatient, updateActivePatient, clearActivePatient } = patientSlice.actions
export default patientSlice.reducer