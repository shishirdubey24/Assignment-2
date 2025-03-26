import { createSlice } from "@reduxjs/toolkit";

// Initial state for tasks (empty array)
const initialTaskState = [];

// Redux slice for managing tasks
const taskSlice = createSlice({
  name: "task",
  initialState: initialTaskState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload); // Add new task
    },
    updateTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload; // Update task details
      }
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload); // Remove task
    },
    loadTasks: (_, action) => {
      return action.payload; // Load tasks from localStorage
    },
    clearTasks: () => {
      return []; // Reset all tasks
    },
  },
});

// Export actions
export const taskAction = taskSlice.actions;

// Export reducer
export default taskSlice.reducer;
