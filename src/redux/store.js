import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import sidebarReducer from "./features/sidebarMenuSlice";
import authReducer from "./features/authReducer/authSlice";
import internReducer from "./features/internSlice";
import jobReducer from "./features/job-reducer/jobSlice";
import questionReducer from "./features/questionReducer/questionSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["sidebar", "auth"],
};

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
  intern: internReducer,
  job: jobReducer,
  question: questionReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
