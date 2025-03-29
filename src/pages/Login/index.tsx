import { useFormik } from "formik";
import * as Yup from "yup";
import "./index.css";
import { InputField } from "../../components/InputField";
import { CustomButton } from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginRequest,
  loginResponseClear,
} from "../../redux/Login/LoginActions";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginResponse, loginLoading } = useSelector(
    (state: any) => state.LoginReducer
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Enter a valid email"
        )
        .required("Required"),
      password: Yup.string()
        .min(8, "Password should contain minimum of 8 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(loginRequest(values));
    },
  });

  useEffect(() => {
    if (loginResponse) {
      if (loginResponse && loginResponse.type === "success") {
        navigate("/");
        toast.success(`${loginResponse.message}`);
      } else if (loginResponse?.response?.data?.message) {
        console.log(loginResponse);
        toast.error(loginResponse?.response?.data?.message);
      } else {
        toast.error(loginResponse?.message);
      }
    }
    dispatch(loginResponseClear());
  }, [loginResponse]);

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <h1 className="login-heading">login</h1>
          <InputField
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            onBlur={formik.handleBlur}
            placeholder="Enter Email"
            type="email"
            required={true}
            errormsg={formik.touched.email && formik.errors.email}
          />
          <InputField
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter Password"
            onBlur={formik.handleBlur}
            name="password"
            type="password"
            required={true}
            errormsg={formik.touched.password && formik.errors.password}
          />
          <CustomButton mt="10px">Login</CustomButton>
          <p onClick={() => navigate("/register")} className="login-para">
            Didn't have account? Register
          </p>
        </form>
      </div>
    </>
  );
};
