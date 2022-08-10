import axios, { AxiosResponse } from 'axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import { IRepository } from '../../types/repository';
import { repositoriesActions, RepositoriesReducerState, repositoriesSelect } from '../reducers/repositoriesReducer';

type NpmRepoGetResponse = {
  objects: IRepository[];
  time: string;
  total: number;
};

export function* workGetRepositoriesFetch() {
  const repositiries: RepositoriesReducerState = yield select(repositoriesSelect);
  const { query } = repositiries;

  if (query === '') {
    yield put(repositoriesActions.searchRepositoriesSuccess([]));
  } else {
    try {
      const repositoriesRequest: AxiosResponse<NpmRepoGetResponse> = yield call(() =>
        axios.get(`https://registry.npmjs.org/-/v1/search?text=${query}`)
      );
      const repositories = repositoriesRequest.data.objects.slice(0, 10);

      yield put(repositoriesActions.searchRepositoriesSuccess(repositories));
      return repositoriesRequest.status;
    } catch (error) {
      let message = error instanceof Error ? error.message : 'Something went wrong';
      yield put(repositoriesActions.searchRepositoriesError(message));
      return -1;
    }
  }
}

function* repositoriesSaga() {
  yield takeEvery(repositoriesActions.searchRepositories.toString(), workGetRepositoriesFetch);
}

export default repositoriesSaga;
