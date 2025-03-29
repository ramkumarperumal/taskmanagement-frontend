import { LoginTypes } from "./LoginActionTypes";

//LOGIN
export const loginRequest = (payload) => ({
  type: LoginTypes.LOGIN_REQUEST,
  payload,
});

export const loginResponse = (payload) => ({
  type: LoginTypes.LOGIN_RESPONSE,
  payload,
});

export const loginResponseClear = () => ({
  type: LoginTypes.LOGIN_RESPONSE_CLEAR,
});

//handle ERROR
export const errorResponse = (payload) => ({
  type: LoginTypes.ERROR_RESPONSE,
  payload,
});

export const errorResponseClear = () => ({
  type: LoginTypes.ERROR_RESPONSE_CLEAR,
});

//REGISTER
export const registerRequest = (payload) => ({
  type: LoginTypes.REGISTER_REQUEST,
  payload,
});

export const registerResponse = (payload) => ({
  type: LoginTypes.REGISTER_RESPONSE,
  payload,
});

export const registerResponseClear = () => ({
  type: LoginTypes.REGISTER_RESPONSE_CLEAR,
});

//CURR USER
export const getCurrUserRequest = (payload) => ({
  type: LoginTypes.GET_CURR_USER_REQUEST,
  payload,
});

export const getCurrUserResponse = (payload) => ({
  type: LoginTypes.GET_CURR_USER_RESPONSE,
  payload,
});

export const getCurrUserResponseClear = () => ({
  type: LoginTypes.GET_CURR_USER_RESPONSE_CLEAR,
});
