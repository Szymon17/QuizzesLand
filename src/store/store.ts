import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, PersistConfig } from "redux-persist";

import { rootReducer } from "./rootReducer";
import logger from "redux-logger";

type rootReducerType = ReturnType<typeof rootReducer>;

type persistConfigExtendType = PersistConfig<rootReducerType> & {
  whitelist?: [keyof rootReducerType];
  blacklist?: [keyof rootReducerType];
};

const persistConfig: persistConfigExtendType = {
  key: "root",
  storage,
  whitelist: ["quizzes"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type dispatchType = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, stateType, unknown, Action<string>>;
export type stateType = ReturnType<typeof store.getState>;
