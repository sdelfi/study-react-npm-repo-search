import createSagaMiddleware from '@redux-saga/core';
import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';

import repositoriesReducer from './reducers/repositoriesReducer';
import repositoriesSaga from './sagas/repositoriesSaga';
import { RootState } from './types';

const saga = createSagaMiddleware();

// Create the root reducer separately so we can extract the RootState type
export const rootReducer = combineReducers({
  repositories: repositoriesReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: [saga],
  });

  saga.run(repositoriesSaga);
  return store;
};
