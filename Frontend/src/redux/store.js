import { configureStore, combineReducers } from '@reduxjs/toolkit'
import blogSlice from './blogSlice'
import authSlice from './userSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const blogPersistConfig = {
  key: 'blog',
  storage,
  whitelist: ['blogs'],
}

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token'],
}

const rootReducer = combineReducers({
  blog: persistReducer(blogPersistConfig, blogSlice),
  auth: persistReducer(authPersistConfig, authSlice),
})

export const store = configureStore({
  reducer: rootReducer,
})

export const persistor = persistStore(store)
