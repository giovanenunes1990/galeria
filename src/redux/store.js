import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import userReducer from './reducers/userReducer';
import themeReducer from './reducers/themeReducer';
import cartReducer from './reducers/cartReducer';

const AllReducers = combineReducers({
    user: userReducer,
    theme: themeReducer,
    cart: cartReducer
});

const persistedReducer = persistReducer(
    {
        key: 'root',
        storage: AsyncStorage,
        whitelist: ['user', 'theme', 'cart'], // reducers que se manteram sendo gravados 
       // blacklist: [], //reducers que nao se manteram sendo gravados 
    }, 
    AllReducers
)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
}); 

const persistor = persistStore(store);

export { store, persistor };