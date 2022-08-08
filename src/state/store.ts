import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';

import repositoriesReducer from './reducers/repositoriesReducer';
import repositoriesSaga from './sagas/repositoriesSaga';

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    repositories: repositoriesReducer,
  },
  middleware: [saga],
});

saga.run(repositoriesSaga);
