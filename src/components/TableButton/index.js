import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./index.css";

export const TableButton = ({ type, onClick }) => {
  const getTableIcon = () => {
    switch (type) {
      case "edit":
        return <EditIcon sx={{ fontSize: "12px" }} />;
      case "delete":
        return <DeleteIcon sx={{ fontSize: "12px" }} />;
    }
  };

  return (
    <button onClick={onClick} className="table-btn">
      {getTableIcon()}
    </button>
  );
};
