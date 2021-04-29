import { put, takeLatest } from 'redux-saga/effects';

function* setActiveUser(action) {
  // console.log('active', action.payload);
  yield put({
    type: 'SET_USER',
    payload: action.payload
  })
  yield put({
    type: 'FETCH_LIBRARY',
    payload: action.payload
  })
}

function* userSaga() {
  yield takeLatest('CREATE_USER', setActiveUser);
}

export default userSaga;