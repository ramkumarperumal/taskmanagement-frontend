import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomButton } from "../../components/CustomButton";
import { InputField } from "../../components/InputField";
import { Dropdown } from "../../components/Dropdown";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserRequest } from "../../redux/User/UserActions";
import {
  getTaskByIdRequest,
  getTaskByIdResponseClear,
  postTaskRequest,
  postTaskResponseClear,
  putTaskRequest,
  putTaskResponseClear,
} from "../../redux/Task/TaskActions";
import toast from "react-hot-toast";
import { getCurrUserRequest } from "../../redux/Login/LoginActions";
import { Textarea } from "../../components/TextArea";

export const TaskForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [userList, setUserList] = useState([]);
  const { userListResponse } = useSelector((state: any) => state.UserReducer);
  const {
    postTaskResponse,
    taskByIdLoading,
    taskByIdResponse,
    putTaskResponse,
  } = useSelector((state: any) => state.TaskReducer);
  const { currUserResponse } = useSelector((state: any) => state.LoginReducer);

  useEffect(() => {
    dispatch(getCurrUserRequest());
    dispatch(getAllUserRequest());
    if (id) {
      dispatch(getTaskByIdRequest(id));
    }
  }, []);

  useEffect((): any => {
    if (taskByIdResponse?.type === "success") {
      for (const key in taskByIdResponse?.data) {
        if (key === "assignee") {
          formik.setFieldValue(key, taskByIdResponse?.data[key]?._id);
        } else if (key === "created_by") {
          formik.setFieldValue(key, taskByIdResponse?.data[key]?._id);
        } else if (key === "due_date") {
          formik.setFieldValue(
            key,
            new Date(taskByIdResponse?.data[key]).toISOString().split("T")[0]
          );
        } else {
          formik.setFieldValue(key, taskByIdResponse?.data[key]);
        }
      }
    }
    return () => dispatch(getTaskByIdResponseClear());
  }, [taskByIdResponse]);

  useEffect(() => {
    if (userListResponse?.type === "success") {
      const updatedUserList = userListResponse?.data?.map((each: any) => ({
        name: `${each?.first_name} ${each?.last_name}`,
        value: each?._id,
      }));
      setUserList(updatedUserList);
    }
  }, [userListResponse]);

  useEffect(() => {
    if (postTaskResponse) {
      if (postTaskResponse && postTaskResponse.type === "success") {
        toast.success(`${postTaskResponse.message}`);
        navigate("/");
      } else if (postTaskResponse?.response?.data?.message) {
        toast.error(postTaskResponse?.response?.data?.message);
      } else {
        toast.error(postTaskResponse?.message);
      }
    }
    dispatch(postTaskResponseClear());
  }, [postTaskResponse]);

  useEffect(() => {
    if (putTaskResponse) {
      if (putTaskResponse && putTaskResponse.type === "success") {
        toast.success(`${putTaskResponse.message}`);
        navigate("/");
      } else if (putTaskResponse?.response?.data?.message) {
        toast.error(putTaskResponse?.response?.data?.message);
      } else {
        toast.error(putTaskResponse?.message);
      }
    }
    dispatch(putTaskResponseClear());
  }, [putTaskResponse]);

  const formik = useFormik({
    initialValues: {
      task_name: "",
      description: "",
      due_date: "",
      priority: "",
      status: "Todo",
      assignee: "",
    },
    validationSchema: Yup.object().shape({
      task_name: Yup.string().required("Required"),
      due_date: Yup.string().required("Required"),
      priority: Yup.string().required("Required"),
      assignee: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (!id) {
        dispatch(postTaskRequest(values));
      } else {
        dispatch(putTaskRequest(values));
      }
    },
  });
  return (
    <div className="table-container">
      <div className="home-title-btn-con">
        <div className="subheader-con">
          <h1 onClick={() => navigate("/")} className="task-heading">
            Task
          </h1>
          <ArrowForwardIosIcon sx={{ fontSize: "18px" }} />
          <h1 className="task-heading">{id ? "  Edit Task" : "New Task"}</h1>
        </div>
        <div>
          <CustomButton onClick={() => formik.handleSubmit()}>
            {id ? "Update" : "Save"}
          </CustomButton>
        </div>
      </div>
      <form className="task-form-con">
        <InputField
          label="Task Name"
          value={formik.values.task_name}
          onChange={formik.handleChange}
          name="task_name"
          onBlur={formik.handleBlur}
          placeholder="Enter Task Name"
          disabled={currUserResponse?.data?.role !== "Admin"}
          type="text"
          required={true}
          errormsg={formik.touched.task_name && formik.errors.task_name}
        />
        <Textarea
          customClass="text-area-new-line-grid"
          labelText="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          name="description"
          onBlur={formik.handleBlur}
          placeholder="Enter Description"
          errorMsg={formik.touched.description && formik.errors.description}
        />
        <InputField
          label="Due Date"
          value={formik.values.due_date}
          onChange={formik.handleChange}
          name="due_date"
          onBlur={formik.handleBlur}
          disabled={currUserResponse?.data?.role !== "Admin"}
          required={true}
          placeholder="Enter Due date"
          type="date"
          errormsg={formik.touched.due_date && formik.errors.due_date}
        />
        <Dropdown
          value={formik.values.priority}
          onChange={formik.handleChange}
          labelText="Priority"
          name="priority"
          placeholder="Choose Priority"
          errorMsg={formik.touched.priority && formik.errors.priority}
          required={true}
          onBlur={formik.handleBlur}
          data={[
            { name: "Low", value: "Low" },
            { name: "Medium", value: "Medium" },
            { name: "High", value: "High" },
            { name: "Critical", value: "Critical" },
          ]}
        />
        <Dropdown
          value={formik.values.status}
          onChange={formik.handleChange}
          labelText="Status"
          name="status"
          placeholder="Choose Status"
          errorMsg={formik.touched.status && formik.errors.status}
          required={true}
          onBlur={formik.handleBlur}
          data={[
            { name: "Todo", value: "Todo" },
            { name: "Inprogress", value: "Inprogress" },
            { name: "Completed", value: "Completed" },
            { name: "Rejected", value: "Rejected" },
            { name: "Cancelled", value: "Cancelled" },
          ]}
        />
        {currUserResponse?.data?.role === "Admin" && (
          <Dropdown
            value={formik.values.assignee}
            onChange={formik.handleChange}
            labelText="Assign User"
            name="assignee"
            placeholder="Choose User"
            errorMsg={formik.touched.assignee && formik.errors.assignee}
            required={true}
            onBlur={formik.handleBlur}
            data={userList}
          />
        )}
      </form>
    </div>
  );
};
