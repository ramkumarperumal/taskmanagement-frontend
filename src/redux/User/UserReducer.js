import { UserTypes } from "./UserActionTypes";

const initialState = {
  userListLoading: false,
  userListResponse: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserTypes.GET_ALL_USER_REQUEST:
      return {
        ...state,
        userListLoading: true,
      };
    case UserTypes.GET_ALL_USER_RESPONSE:
      return {
        ...state,
        userListLoading: false,
        userListResponse: action.payload,
      };
    case UserTypes.GET_ALL_USER_RESPONSE_CLEAR:
      return {
        ...state,
        userListResponse: null,
      };
    default:
      return state;
  }
};

export default UserReducer;
