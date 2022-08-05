import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { IRepository } from '../../types/repository'

interface RepositoriesReducerState {
    loading: boolean
    data: IRepository[]
    error: string | null
}

const initialState = {
    data: [],
    loading: false,
    error: null,
} as RepositoriesReducerState

const repositoriesSlice = createSlice({
    name: 'repositories',
    initialState,
    reducers: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        searchRepositories(state, action: PayloadAction<string>) {
            state.loading = true
            state.error = null
            state.data = []
        },
        searchRepositoriesSuccess(state, action: PayloadAction<IRepository[]>) {
            state.loading = false
            state.error = null
            state.data = action.payload
        },
        searchRepositoriesError(state, action: PayloadAction<string>) {
            state.loading = false
            state.data = []
            state.error = action.payload
        },
    },
})

export const repositoriesSelect = (state: RootState) => state.repositories
export const repositoriesDataSelect = (state: RootState) =>
    state.repositories.data
export const repositoriesErrorSelect = (state: RootState) =>
    state.repositories.error
export const repositoriesLoadingSelect = (state: RootState) =>
    state.repositories

// export const { searchRepositoriesSuccess, searchRepositories, searchRepositoriesError }
// = repositoriesSlice.actions;
export const repositoriesActions = repositoriesSlice.actions
export default repositoriesSlice.reducer
