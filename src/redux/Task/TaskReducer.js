import { TaskTypes } from "./TaskActionTypes";

const initialState = {
  taskListLoading: false,
  taskListResponse: null,

  taskByIdLoading: false,
  taskByIdResponse: null,

  postTaskLoading: false,
  postTaskResponse: null,

  putTaskLoading: false,
  putTaskResponse: null,

  deleteTaskLoading: false,
  deleteTaskResponse: null,
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TaskTypes.GET_ALL_TASK_REQUEST:
      return {
        ...state,
        taskListLoading: true,
      };
    case TaskTypes.GET_ALL_TASK_RESPONSE:
      return {
        ...state,
        taskListLoading: false,
        taskListResponse: action.payload,
      };
    case TaskTypes.GET_ALL_TASK_RESPONSE_CLEAR:
      return {
        ...state,
        taskListResponse: null,
      };
    case TaskTypes.GET_TASK_BY_ID_REQUEST:
      return {
        ...state,
        taskByIdLoading: true,
      };
    case TaskTypes.GET_TASK_BY_ID_RESPONSE:
      return {
        ...state,
        taskByIdLoading: false,
        taskByIdResponse: action.payload,
      };
    case TaskTypes.GET_TASK_BY_ID_RESPONSE_CLEAR:
      return {
        ...state,
        taskByIdResponse: null,
      };
    case TaskTypes.POST_TASK_REQUEST:
      return {
        ...state,
        postTaskLoading: true,
      };
    case TaskTypes.POST_TASK_RESPONSE:
      return {
        ...state,
        postTaskLoading: false,
        postTaskResponse: action.payload,
      };
    case TaskTypes.POST_TASK_RESPONSE_CLEAR:
      return {
        ...state,
        postTaskResponse: null,
      };
    case TaskTypes.PUT_TASK_REQUEST:
      return {
        ...state,
        putTaskLoading: true,
      };
    case TaskTypes.PUT_TASK_RESPONSE:
      return {
        ...state,
        putTaskLoading: false,
        putTaskResponse: action.payload,
      };
    case TaskTypes.PUT_TASK_RESPONSE_CLEAR:
      return {
        ...state,
        putTaskResponse: null,
      };
    case TaskTypes.DELETE_TASK_REQUEST:
      return {
        ...state,
        deleteTaskLoading: true,
      };
    case TaskTypes.DELETE_TASK_RESPONSE:
      return {
        ...state,
        deleteTaskLoading: false,
        deleteTaskResponse: action.payload,
      };
    case TaskTypes.DELETE_TASK_RESPONSE_CLEAR:
      return {
        ...state,
        deleteTaskResponse: null,
      };
    default:
      return state;
  }
};

export default TaskReducer;
