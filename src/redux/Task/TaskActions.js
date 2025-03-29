import { TaskTypes } from "./TaskActionTypes";

//GET ALL task
export const getTaskListRequest = (payload) => ({
  type: TaskTypes.GET_ALL_TASK_REQUEST,
  payload,
});

export const getTaskListResponse = (payload) => ({
  type: TaskTypes.GET_ALL_TASK_RESPONSE,
  payload,
});

export const getTaskListResponseClear = () => ({
  type: TaskTypes.GET_ALL_TASK_RESPONSE_CLEAR,
});

//GET TASK BY ID
export const getTaskByIdRequest = (payload) => ({
  type: TaskTypes.GET_TASK_BY_ID_REQUEST,
  payload,
});

export const getTaskByIdResponse = (payload) => ({
  type: TaskTypes.GET_TASK_BY_ID_RESPONSE,
  payload,
});

export const getTaskByIdResponseClear = () => ({
  type: TaskTypes.GET_TASK_BY_ID_RESPONSE_CLEAR,
});

//POST TASK
export const postTaskRequest = (payload) => ({
  type: TaskTypes.POST_TASK_REQUEST,
  payload,
});

export const postTaskResponse = (payload) => ({
  type: TaskTypes.POST_TASK_RESPONSE,
  payload,
});

export const postTaskResponseClear = () => ({
  type: TaskTypes.POST_TASK_RESPONSE_CLEAR,
});

//PUT TASK
export const putTaskRequest = (payload) => ({
  type: TaskTypes.PUT_TASK_REQUEST,
  payload,
});

export const putTaskResponse = (payload) => ({
  type: TaskTypes.PUT_TASK_RESPONSE,
  payload,
});

export const putTaskResponseClear = () => ({
  type: TaskTypes.PUT_TASK_RESPONSE_CLEAR,
});

//DELETE TASK
export const deleteTaskRequest = (payload) => ({
  type: TaskTypes.DELETE_TASK_REQUEST,
  payload,
});

export const deleteTaskResponse = (payload) => ({
  type: TaskTypes.DELETE_TASK_RESPONSE,
  payload,
});

export const deleteTaskResponseClear = () => ({
  type: TaskTypes.DELETE_TASK_RESPONSE_CLEAR,
});
