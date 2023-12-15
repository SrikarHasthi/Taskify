import { configureStore } from '@reduxjs/toolkit'
import taskPopupReducer from './reducers/taskPopupReducer'
import taskDataReducer from './reducers/taskDataReducer'

export const store = configureStore({
  reducer: {
    taskPopup: taskPopupReducer,
    taskData: taskDataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>