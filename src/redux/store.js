import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer', 'cartReducer'],
  // blacklist: ['loading', 'isError', 'errorMsg'],
};
const authPersistConfig = {
  key: 'authReducer',
  storage: AsyncStorage,
  // whitelist: ['token', 'roles_id'],
  blacklist: ['loading', 'isError', 'errorMsg'],
};
const cartPersistConfig = {
  key: 'cartReducer',
  storage: AsyncStorage,
  whitelist: ['cart'],
};

const storeReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, storeReducer);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(thunk, logger)),
);
export const persistor = persistStore(store);
