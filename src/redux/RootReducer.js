import { combineReducers } from "redux";
import LoginReducer from "./Login/LoginReducer";
import TaskReducer from "./Task/TaskReducer";
import UserReducer from "./User/UserReducer";

export default combineReducers({
  LoginReducer,
  TaskReducer,
  UserReducer,
});
