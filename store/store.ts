import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Default to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./slices/authSlice";
import { combineReducers } from "redux";

// Define the persist configuration
const persistConfig = {
  key: "root", // Key for localStorage
  storage, // Use localStorage as default storage
  whitelist: ["auth"], // Specify which reducers to persist
};

// Combine reducers if you have multiple reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

// Create the persistor
export const persistor = persistStore(store);

// Types for usage throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
