import { LoginTypes } from "./LoginActionTypes";

const initialState = {
  loginLoading: false,
  loginResponse: null,

  error_response: null,

  registerLoading: false,
  registerResponse: null,

  currUserLoading: false,
  currUserResponse: null,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LoginTypes.LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
      };
    case LoginTypes.LOGIN_RESPONSE:
      return {
        ...state,
        loginLoading: false,
        loginResponse: action.payload,
      };
    case LoginTypes.LOGIN_RESPONSE_CLEAR:
      return {
        ...state,
        loginResponse: null,
      };
    case LoginTypes.ERROR_RESPONSE:
      return {
        ...state,
        error_response: action.payload,
      };
    case LoginTypes.ERROR_RESPONSE_CLEAR:
      return {
        ...state,
        error_response: null,
      };
    case LoginTypes.REGISTER_REQUEST:
      return {
        ...state,
        registerLoading: true,
      };
    case LoginTypes.REGISTER_RESPONSE:
      return {
        ...state,
        registerLoading: false,
        registerResponse: action.payload,
      };
    case LoginTypes.REGISTER_RESPONSE_CLEAR:
      return {
        ...state,
        registerResponse: null,
      };
    case LoginTypes.GET_CURR_USER_REQUEST:
      return {
        ...state,
        currUserLoading: true,
      };
    case LoginTypes.GET_CURR_USER_RESPONSE:
      return {
        ...state,
        currUserLoading: false,
        currUserResponse: action.payload,
      };
    case LoginTypes.GET_CURR_USER_RESPONSE_CLEAR:
      return {
        ...state,
        currUserResponse: null,
      };
    default:
      return state;
  }
};

export default LoginReducer;
