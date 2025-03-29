import { all } from "redux-saga/effects";
import { LoginWatcherSaga } from "./Login/LoginSaga";
import { TaskWatcherSaga } from "./Task/TaskSaga";
import { UserWatcherSaga } from "./User/UserSaga";

export default function* RootSaga() {
  yield all([LoginWatcherSaga(), TaskWatcherSaga(), UserWatcherSaga()]);
}
