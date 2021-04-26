import { all } from 'redux-saga/effects';
import librarySaga from './librarySaga';
import userSaga from './userSaga';

function* rootSaga() {
  yield all([
    librarySaga(),
    userSaga()
  ])
}

export default rootSaga;