import { UserTypes } from "./UserActionTypes";
import { takeLatest, put, call } from "redux-saga/effects";
import {
  axiosDelete,
  axiosGet,
  axiosPost,
  axiosPut,
  setAuthToken,
} from "../../Utils/axios";
import { errorResponse } from "../Login/LoginActions";
import { getAllUserResponse } from "./UserActions";

function* getAllUser() {
  try {
    const token = localStorage.getItem("token");
    setAuthToken(token);
    const response = yield call(() =>
      axiosGet("users").then((res) => res?.data)
    );
    yield put(getAllUserResponse(response));
  } catch (err) {
    yield put(errorResponse(err));
    yield put(getAllUserResponse(err));
  }
}

//WATCHER
export function* UserWatcherSaga() {
  yield takeLatest(UserTypes.GET_ALL_USER_REQUEST, getAllUser);
}
