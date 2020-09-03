import { call, put, all, takeEvery } from 'redux-saga/effects'
import {
  USER_FETCH_REQUESTED, USER_FETCH_SUCCEEDED,
  USER_FETCH_FAILED, DELETE_USER,
  DELETE_USER_SUCCESSED, DELETE_USER_FAILED,
  CREATE_USER, CREATE_USER_FAILED, CREATE_USER_SUCCESSED,
  EDIT_USER, EDIT_USER_SUCCESSED, EDIT_USER_FAILED
} from "../action/action";
import { fetchData, deleteData, createData, editData } from "../api";
function* fetchUser() {
  try {
    const user = yield call(fetchData);
    yield put({ type: USER_FETCH_SUCCEEDED, user: user });
  } catch (e) {
    yield put({ type: USER_FETCH_FAILED, message: e.message });
  }
}

function* deleteUser(action) {
  try {
    const user = yield call(deleteData, action);
    yield put({ type: DELETE_USER_SUCCESSED, user: user });
  } catch (e) {
    yield put({ type: DELETE_USER_FAILED, message: e.message });
  }
}


function* createUser(action) {
  try {
    const user = yield call(createData, action);
    yield put({ type: CREATE_USER_SUCCESSED, user: user });
  } catch (e) {
    yield put({ type: CREATE_USER_FAILED, message: e.message });
  }
}

function* editUser(action) {
  try {
    const user = yield call(editData, action);
    yield put({ type: EDIT_USER_SUCCESSED, user: user });
  } catch (e) {
    yield put({ type: EDIT_USER_FAILED, message: e.message });
  }
}
function* mySaga() {
  yield all([takeEvery(USER_FETCH_REQUESTED, fetchUser),
  takeEvery(DELETE_USER, deleteUser),
  takeEvery(CREATE_USER, createUser),
  takeEvery(EDIT_USER, editUser)
  ]
  );
}

export default mySaga;