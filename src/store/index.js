import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

import teachersReducer from './slices/teachersSlice';
import userReducer from './slices/userSlice';


const persistConfig = {
  key: 'mymatch-root',
  version: 1,
  storage,
  whitelist: ['teachers', 'user'],
  migrate: (state) => {
    // Migration for simplified coins structure
    if (state && state.user && state.user.currentUser && typeof state.user.currentUser.coins === 'object') {
      // Convert old coins object to simple number
      const oldCoins = state.user.currentUser.coins;
      state.user.currentUser.coins = oldCoins.balance || oldCoins || 1000;
    }
    return Promise.resolve(state);
  }
};

const rootReducer = combineReducers({
  teachers: teachersReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store); 