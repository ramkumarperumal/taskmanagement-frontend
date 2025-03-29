import { takeLatest, put, call } from "redux-saga/effects";
import { LoginTypes } from "./LoginActionTypes";
import {
  errorResponse,
  getCurrUserResponse,
  loginResponse,
  registerResponse,
} from "./LoginActions";
import { axiosGet, axiosPost, setAuthToken } from "../../Utils/axios";

function* onlogin({ payload }) {
  try {
    const response = yield call(() =>
      axiosPost("auth/login", payload).then((response) => response?.data)
    );
    if (response.type === "success") {
      localStorage.setItem("token", response?.data?.token);
      setAuthToken(response?.data?.token);
    }
    yield put(loginResponse(response));
  } catch (error) {
    yield put(errorResponse(error));
    yield put(loginResponse(error));
  }
}

function* onRegister({ payload }) {
  try {
    const response = yield call(() =>
      axiosPost("users", payload).then((response) => response?.data)
    );
    yield put(registerResponse(response));
  } catch (error) {
    yield put(errorResponse(error));
    yield put(registerResponse(error));
  }
}

function* getCurrUser() {
  try {
    const token = localStorage.getItem("token");
    setAuthToken(token);
    const response = yield call(() =>
      axiosGet(`users/curr_user`).then((res) => res.data)
    );
    yield put(getCurrUserResponse(response));
  } catch (err) {
    yield put(errorResponse(err));
    yield put(getCurrUserResponse(err));
  }
}

//WATCHER
export function* LoginWatcherSaga() {
  yield takeLatest(LoginTypes.LOGIN_REQUEST, onlogin);
  yield takeLatest(LoginTypes.REGISTER_REQUEST, onRegister);
  yield takeLatest(LoginTypes.GET_CURR_USER_REQUEST, getCurrUser);
}
