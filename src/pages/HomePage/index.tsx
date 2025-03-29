import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskRequest,
  deleteTaskResponseClear,
  getTaskByIdRequest,
  getTaskListRequest,
} from "../../redux/Task/TaskActions";
import { Loader } from "../../components/Loader";
import { TableButton } from "../../components/TableButton";
import "./index.css";
import { NoRecords } from "../../components/NoRecords";
import { CustomButton } from "../../components/CustomButton";
import toast from "react-hot-toast";
import { getCurrUserRequest } from "../../redux/Login/LoginActions";
import { useNavigate } from "react-router-dom";
import { TablePagination } from "@mui/material";
import AlertDialog from "../../components/ConfirmDialog";
import { Dropdown } from "../../components/Dropdown";

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [open, setOpen] = useState(false);
  const [currDeleteId, setCurrDeleteId] = useState("");
  const [filter, setFilter] = useState({ priority: "", status: "" });

  const {
    taskListLoading,
    taskListResponse,
    deleteTaskLoading,
    deleteTaskResponse,
  } = useSelector((state: any) => state.TaskReducer);

  const { currUserResponse } = useSelector((state: any) => state.LoginReducer);

  useEffect(() => {
    dispatch(getCurrUserRequest());
  }, []);

  useEffect(() => {
    if (deleteTaskLoading) return;
    dispatch(getTaskListRequest({ page, count, filter }));
  }, [page, count, deleteTaskLoading, filter]);

  useEffect(() => {
    if (deleteTaskResponse) {
      if (deleteTaskResponse && deleteTaskResponse.type === "success") {
        toast.success(`${deleteTaskResponse.message}`);
      } else if (deleteTaskResponse?.response?.data?.message) {
        toast.error(deleteTaskResponse?.response?.data?.message);
      } else {
        toast.error(deleteTaskResponse?.message);
      }
    }
    dispatch(deleteTaskResponseClear());
  }, [deleteTaskResponse]);

  const confirmDelete = () => {
    dispatch(deleteTaskRequest(currDeleteId));
    setCurrDeleteId("");
  };

  return (
    <>
      <AlertDialog
        onClickConfirm={confirmDelete}
        open={open}
        setOpen={setOpen}
      />
      {taskListLoading ? (
        <Loader />
      ) : (
        <div className="table-container">
          <div className="home-title-btn-con">
            <h1 className="task-heading">Task Management</h1>
            {currUserResponse?.data?.role === "Admin" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Dropdown
                  sm={true}
                  value={filter.priority}
                  onChange={(e: any) =>
                    setFilter((prev) => ({ ...prev, priority: e.target.value }))
                  }
                  labelText="Priority"
                  name="priority"
                  placeholder="Choose Priority"
                  data={[
                    { name: "Low", value: "Low" },
                    { name: "Medium", value: "Medium" },
                    { name: "High", value: "High" },
                    { name: "Critical", value: "Critical" },
                  ]}
                />
                <Dropdown
                  sm={true}
                  value={filter.status}
                  onChange={(e: any) =>
                    setFilter((prev) => ({ ...prev, status: e.target.value }))
                  }
                  labelText="Status"
                  placeholder="Choose Status"
                  data={[
                    { name: "Todo", value: "Todo" },
                    { name: "Inprogress", value: "Inprogress" },
                    { name: "Completed", value: "Completed" },
                    { name: "Rejected", value: "Rejected" },
                    { name: "Cancelled", value: "Cancelled" },
                  ]}
                />
                <CustomButton
                  onClick={() => setFilter({ priority: "", status: "" })}
                >
                  Reset Filter
                </CustomButton>
                <CustomButton onClick={() => navigate("/add-task")}>
                  New Task
                </CustomButton>
              </div>
            )}
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>S NO</th>
                <th>TASK NAME</th>
                <th>DUE DATE</th>
                <th>PRIORITY</th>
                <th>ASSIGNEE</th>
                <th>STATUS</th>
                <th>CREATED BY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {taskListResponse?.data?.data?.length > 0 ? (
                taskListResponse?.data?.data?.map(
                  (each: any, index: number) => (
                    <tr>
                      <td className="td">{index + 1}</td>
                      <td className="td">{each?.task_name}</td>
                      <td className="td">
                        {new Date(each?.due_date).toLocaleDateString()}
                      </td>
                      <td className="td">{each?.priority}</td>
                      <td className="td">
                        {each?.assignee?.first_name
                          ? `${each?.assignee?.first_name} ${each?.assignee?.last_name}`
                          : "NA"}
                      </td>
                      <td className="td">{each?.status}</td>
                      <td className="td">
                        {each?.created_by?.first_name
                          ? `${each?.created_by?.first_name} ${each?.created_by?.last_name}`
                          : "NA"}
                      </td>
                      <td className="td">
                        <TableButton
                          onClick={() => {
                            navigate(`/edit-task/${each?._id}`);
                          }}
                          type="edit"
                        />
                        {currUserResponse?.data?.role === "Admin" && (
                          <TableButton
                            onClick={() => {
                              setOpen(true);
                              setCurrDeleteId(each?._id);
                            }}
                            type="delete"
                          />
                        )}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <NoRecords colSpan={8} />
              )}
            </tbody>
          </table>
          <TablePagination
            component="div"
            count={taskListResponse?.data?.totalDocs}
            page={page - 1}
            onPageChange={(e, newpage) => {
              setPage(newpage + 1);
            }}
            rowsPerPage={count}
            onRowsPerPageChange={(e) => {
              setCount(parseInt(e.target.value, 10));
              setPage(1);
            }}
          />
        </div>
      )}
    </>
  );
};
