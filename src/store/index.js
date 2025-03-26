import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./Task"; // Import task reducer

const store = configureStore({
  reducer: {
    task: taskReducer, // Register task reducer
  },
});

export default store;
