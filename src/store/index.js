import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import teachersReducer from './slices/teachersSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  teachers: teachersReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
}); 