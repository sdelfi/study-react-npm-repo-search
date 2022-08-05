import axios, { AxiosResponse } from 'axios'
import { takeEvery, put, call } from 'redux-saga/effects'
import { repositoriesActions } from '../reducers/repositoriesReducer'
import { NpmRepoGetResponse } from '../../types/repository'

export type RepositoriesFetchType = {
    payload: string
    type: string
}

// type SliceActions<T> = {
// 	[K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
// }[keyof T];

// type ActionTypes = SliceActions<typeof repositoriesActions>;

/**
 * Use it to fix issue with redux-saga
 * We usually don't care about TNext of saga generators, but by defalut it's unknown and it produces lot of type errors
 * https://github.com/redux-saga/redux-saga/issues/884
 * another possible solution https://github.com/agiledigital/typed-redux-saga
 */
// export type SagaGenerator<T = unknown, TReturn = any, TNext = any> = Generator<T, TReturn, TNext>;

function* workGetRepositoriesFetch({ payload }: RepositoriesFetchType) {
    // const reqData = Object.assign({}, payload, { cancelToken: source.token });

    try {
        const repositoriesRequest: AxiosResponse<NpmRepoGetResponse> =
            yield call(() =>
                axios.get(
                    `https://registry.npmjs.org/-/v1/search?text=${payload}`
                )
            )

        const repositories = repositoriesRequest.data.objects.slice(0, 10)

        yield put(repositoriesActions.searchRepositoriesSuccess(repositories))
    } catch (error) {
        let message = 'Something went wrong'
        if (error instanceof Error) {
            message = error.message
        }
        yield put(repositoriesActions.searchRepositoriesError(message))
    }
}

function* repositoriesSaga() {
    yield takeEvery(
        repositoriesActions.searchRepositories.toString(),
        workGetRepositoriesFetch
    )
}

export default repositoriesSaga
