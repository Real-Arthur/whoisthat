import { put, takeLatest } from 'redux-saga/effects';

function* getUserLibrary(action) {
  // console.log('s', action);

}

function* userSaga() {
  yield takeLatest('FETCH_LIBRARY', getUserLibrary);
}

export default userSaga;