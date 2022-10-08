
import { configureStore } from '@reduxjs/toolkit'
import userSlicer from './userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, userSlicer)

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})