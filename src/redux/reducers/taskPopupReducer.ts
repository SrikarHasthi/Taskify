import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface taskPopupState {
    taskPopupValue: boolean
}
  
const initialState: taskPopupState = {
  taskPopupValue: false,
}


export const taskPopupSlice = createSlice({
  name: 'taskPopup',
  initialState,
  reducers: {
    setTaskPopup: (state, action: PayloadAction<boolean>) => {
      state.taskPopupValue = action.payload
    },
  },
})
export const { setTaskPopup } = taskPopupSlice.actions

export default taskPopupSlice.reducer