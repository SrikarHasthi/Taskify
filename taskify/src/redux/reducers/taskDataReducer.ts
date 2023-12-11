import { TaskData } from "../../Interfaces";
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: TaskData[] = [
  {
    id: 0,
    summary: "",
    description: "",
    priority: "",
    time: "",
    status: "",
  }
]

export const taskDataSlice = createSlice({
  name: 'taskData',
  initialState,
  reducers: {
    setTaskData: (state, action: PayloadAction<TaskData[]>) => {
      return action.payload
    },
  },
})
export const { setTaskData } = taskDataSlice.actions

export default taskDataSlice.reducer