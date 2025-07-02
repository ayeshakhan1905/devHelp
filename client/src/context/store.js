import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import authReducer from "../features/auth/authSlice";
import doubtReducer from "../features/doubts/doubtSlice";
import commentReducer from "../features/comments/commentSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth state
};

const rootReducer = combineReducers({
  auth: authReducer,
  doubt: doubtReducer,
  comment: commentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required by redux-persist
    }),
});

export const persistor = persistStore(store);
