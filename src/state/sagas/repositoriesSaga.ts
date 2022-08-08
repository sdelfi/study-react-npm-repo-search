import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { IRepository } from '../../types/repository';
import { repositoriesActions } from '../reducers/repositoriesReducer';

export type RepositoriesFetchType = {
  payload: string;
  type: string;
};

type NpmRepoGetResponse = {
  objects: IRepository[];
  time: string;
  total: number;
};

function* workGetRepositoriesFetch({ payload }: RepositoriesFetchType) {
  if (payload === '') {
    yield put(repositoriesActions.searchRepositoriesSuccess([]));
  } else {
    try {
      const repositoriesRequest: AxiosResponse<NpmRepoGetResponse> = yield call(() =>
        axios.get(`https://registry.npmjs.org/-/v1/search?text=${payload}`)
      );

      const repositories = repositoriesRequest.data.objects.slice(0, 10);

      yield put(repositoriesActions.searchRepositoriesSuccess(repositories));
    } catch (error) {
      let message = 'Something went wrong';
      if (error instanceof Error) {
        message = error.message;
      }
      yield put(repositoriesActions.searchRepositoriesError(message));
    }
  }
}

function* repositoriesSaga() {
  yield takeEvery(repositoriesActions.searchRepositories.toString(), workGetRepositoriesFetch);
}

export default repositoriesSaga;
