import { UserTypes } from "./UserActionTypes";

export const getAllUserRequest = (payload) => ({
  type: UserTypes.GET_ALL_USER_REQUEST,
  payload,
});

export const getAllUserResponse = (payload) => ({
  type: UserTypes.GET_ALL_USER_RESPONSE,
  payload,
});

export const getAllUserResponseClear = () => ({
  type: UserTypes.GET_ALL_USER_RESPONSE_CLEAR,
});
