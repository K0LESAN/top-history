import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api';
import { rootReducer, rootReducerPath } from './slices/root-slice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [rootReducerPath]: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
