import { call, put, all, takeEvery } from 'redux-saga/effects'
import {
  USER_FETCH_REQUESTED, USER_FETCH_SUCCEEDED,
  USER_FETCH_FAILED, DELETE_USER,
  DELETE_USER_SUCCESSED, DELETE_USER_FAILED,
  CREATE_USER, CREATE_USER_FAILED, CREATE_USER_SUCCESSED,
  EDIT_USER, EDIT_USER_SUCCESSED, EDIT_USER_FAILED
} from "../action/action";
import { fetchData, deleteData, createData, editData } from "../api";
const message="Error Oops something went wrong"


function* fetchUser() {
  try {
    const user = yield call(fetchData);
    console.log("user",user);
    if (user !== undefined && user !== message) {
      yield put({ type: USER_FETCH_SUCCEEDED, user: user });
    }
    else {
      yield put({ type: USER_FETCH_FAILED, message: message });
    }
  }
  catch (e) {
    console.log(e);
    yield put({ type: USER_FETCH_FAILED, message: e });
  }
}

function* deleteUser(action) {
  const user = yield call(deleteData, action);
  console.log("user", user);
  if (user !== undefined) {
    yield put({ type: DELETE_USER_SUCCESSED, user: user });
  }
  else {
    yield put({ type: DELETE_USER_FAILED, message: message });
  }
}

function* createUser(action) {
  const user = yield call(createData, action);
  if (user !== undefined && user !== "Failed to fetch") {
    yield put({ type: CREATE_USER_SUCCESSED, user: user });
  }
  else {
    yield put({ type: CREATE_USER_FAILED, message: message });
  }
}

function* editUser(action) {
  const user = yield call(editData, action);
  if (user !== undefined) {
    yield put({ type: EDIT_USER_SUCCESSED, user: user });
  }
  else {
    yield put({ type: EDIT_USER_FAILED, message: message });
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