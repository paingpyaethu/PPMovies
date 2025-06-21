import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rootSaga} from './rootSaga.ts';
import movieReducer from '@/features/movies/movieSlice';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['movies'],
};

const store = configureStore({
  reducer: {
    movies: persistReducer(persistConfig, movieReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({thunk: false, serializableCheck: false}).concat(
      sagaMiddleware,
    ),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
