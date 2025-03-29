import { takeLatest, put, call } from "redux-saga/effects";
import {
  axiosDelete,
  axiosGet,
  axiosPost,
  axiosPut,
  setAuthToken,
} from "../../Utils/axios";
import { TaskTypes } from "./TaskActionTypes";
import { errorResponse } from "../Login/LoginActions";
import {
  deleteTaskResponse,
  getTaskByIdResponse,
  getTaskListResponse,
  postTaskResponse,
  putTaskResponse,
} from "./TaskActions";

function* getAllTask({ payload }) {
  try {
    const token = localStorage.getItem("token");
    setAuthToken(token);
    console.log(payload);
    const { page = 1, count = "", filter } = payload;
    const response = yield call(() =>
      axiosGet(
        `tasks?page=${page}&limit=${count}&priority=${filter.priority}&status=${filter.status}`
      ).then((res) => res?.data)
    );

    yield put(getTaskListResponse(response));
  } catch (err) {
    yield put(errorResponse(err));
    yield put(getTaskListResponse(err));
  }
}

function* getTaskById({ payload }) {
  try {
    const response = yield call(() =>
      axiosGet(`tasks/${payload}`).then((res) => res.data)
    );

    yield put(getTaskByIdResponse(response));
  } catch (err) {
    yield put(errorResponse(err));
    yield put(getTaskByIdResponse(err));
  }
}

function* postTask({ payload }) {
  try {
    const response = yield call(() =>
      axiosPost(`tasks`, payload).then((res) => res.data)
    );

    yield put(postTaskResponse(response));
  } catch (err) {
    yield put(errorResponse(err));
    yield put(postTaskResponse(err));
  }
}

function* putTask({ payload }) {
  try {
    const response = yield call(() =>
      axiosPut(`tasks/${payload?._id}`, payload).then((res) => res.data)
    );

    yield put(putTaskResponse(response));
  } catch (err) {
    yield put(errorResponse(err));
    yield put(putTaskResponse(err));
  }
}

function* deleteTask({ payload }) {
  try {
    const response = yield call(() =>
      axiosDelete(`tasks/${payload}`).then((res) => res.data)
    );

    yield put(deleteTaskResponse(response));
  } catch (err) {
    yield put(errorResponse(err));
    yield put(deleteTaskResponse(err));
  }
}

//WATCHER
export function* TaskWatcherSaga() {
  yield takeLatest(TaskTypes.GET_ALL_TASK_REQUEST, getAllTask);
  yield takeLatest(TaskTypes.GET_TASK_BY_ID_REQUEST, getTaskById);
  yield takeLatest(TaskTypes.POST_TASK_REQUEST, postTask);
  yield takeLatest(TaskTypes.PUT_TASK_REQUEST, putTask);
  yield takeLatest(TaskTypes.DELETE_TASK_REQUEST, deleteTask);
}
