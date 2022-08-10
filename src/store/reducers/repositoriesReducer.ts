import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { IRepository } from '../../types/repository';
import { RootState } from '..';

export interface RepositoriesReducerState {
  query: string;
  loading: boolean;
  data: IRepository[];
  error: string | null;
}

const initialState = {
  query: '',
  data: [],
  loading: false,
  error: null,
} as RepositoriesReducerState;

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    // Disable eslint check because we use this payload in the redux-saga effect
    searchRepositories(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    searchRepositoriesSuccess(state, action: PayloadAction<IRepository[]>) {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    searchRepositoriesError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});

export const repositoriesSelect = (state: RootState) => state.repositories;
export const repositoriesDataSelect = (state: RootState) => state.repositories.data;
export const repositoriesErrorSelect = (state: RootState) => state.repositories.error;
export const repositoriesLoadingSelect = (state: RootState) => state.repositories;

export const repositoriesActions = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
