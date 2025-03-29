import { useNavigate } from "react-router-dom";
import { CustomButton } from "../CustomButton";
import "./index.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getCurrUserResponseClear } from "../../redux/Login/LoginActions";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currUserResponse } = useSelector((state: any) => state.LoginReducer);

  const clearLocalStorage = () => {
    dispatch(getCurrUserResponseClear());
    localStorage.clear();
    navigate("/login");
    toast.success("logout successful");
  };

  console.log(currUserResponse);
  return (
    <div className="header-container">
      <div className="header-title-con">
        <h3 className="header-title">Vitasoft</h3>
      </div>
      {currUserResponse?.data && (
        <div>
          <CustomButton onClick={clearLocalStorage}>Logout</CustomButton>
        </div>
      )}
    </div>
  );
};
