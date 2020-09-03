import { call, put, all, takeEvery } from 'redux-saga/effects'
import {
  USER_FETCH_REQUESTED, USER_FETCH_SUCCEEDED,
  USER_FETCH_FAILED, DELETE_USER,
  DELETE_USER_SUCCESSED, DELETE_USER_FAILED,
  CREATE_USER, CREATE_USER_FAILED, CREATE_USER_SUCCESSED
} from "../action/action";
import { fetchData, deleteData,createData} from "../api";
function* fetchUser() {
  try {
    const user = yield call(fetchData);
    console.log("user", user);
    yield put({ type: USER_FETCH_SUCCEEDED, user: user });
  } catch (e) {
    yield put({ type: USER_FETCH_FAILED, message: e.message });
  }
}

function* deleteUser(action) {
  console.log("action", action);
  try {
    const user = yield call(deleteData, action);
    console.log("userdsdsdsdds", user);
    yield put({ type: DELETE_USER_SUCCESSED, user: user });
  } catch (e) {
    yield put({ type: DELETE_USER_FAILED, message: e.message });
  }
}


function* createUser(action) {
  console.log("action", action);
  try {
    const user = yield call(createData, action);
    console.log("userdsdsdsdds", user);
    yield put({ type: CREATE_USER_SUCCESSED, user: user });
  } catch (e) {
    yield put({ type: CREATE_USER_FAILED, message: e.message });
  }
}
function* mySaga() {
  yield all([takeEvery(USER_FETCH_REQUESTED, fetchUser),
  takeEvery(DELETE_USER, deleteUser),
  takeEvery(CREATE_USER, createUser)]
  );
}

export default mySaga;