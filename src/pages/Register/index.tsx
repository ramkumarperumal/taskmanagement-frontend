import { useFormik } from "formik";
import * as Yup from "yup";
import "./index.css";
import { InputField } from "../../components/InputField";
import { CustomButton } from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../../components/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  registerRequest,
  registerResponseClear,
} from "../../redux/Login/LoginActions";
import { Country, State } from "country-state-city";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { registerLoading, registerResponse } = useSelector(
    (state: any) => state.LoginReducer
  );

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      role: "",
      phone_number: "",
      address: "",
      country: "",
      state: "",
      city: "",
      zip_code: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Enter a valid email"
        )
        .required("Required"),
      role: Yup.string().required("Required"),
      phone_number: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      zip_code: Yup.number().required("Required"),
      password: Yup.string()
        .min(8, "Password should contain minimum of 8 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(registerRequest(values));
    },
  });

  useEffect(() => {
    if (registerResponse) {
      if (registerResponse && registerResponse.type === "success") {
        navigate("/login");
        toast.success(`${registerResponse.message}`);
      } else if (registerResponse?.response?.data?.message) {
        toast.error(registerResponse?.response?.data?.message);
      } else {
        toast.error(registerResponse?.message);
      }
    }
    dispatch(registerResponseClear());
  }, [registerResponse]);

  return (
    <>
      <div className="register-container">
        <h1 className="login-heading">Register</h1>

        <form className="register-form" onSubmit={formik.handleSubmit}>
          <div className="register-input-con">
            <InputField
              label="First Name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              name="first_name"
              onBlur={formik.handleBlur}
              placeholder="Enter First Name"
              type="text"
              required={true}
              errormsg={formik.touched.first_name && formik.errors.first_name}
            />
            <InputField
              label="Last Name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              name="last_name"
              onBlur={formik.handleBlur}
              placeholder="Enter Last Name"
              type="text"
              required={true}
              errormsg={formik.touched.last_name && formik.errors.last_name}
            />
            <InputField
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              required={true}
              onBlur={formik.handleBlur}
              placeholder="Enter Email"
              type="email"
              errormsg={formik.touched.email && formik.errors.email}
            />
            <InputField
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Enter Password"
              required={true}
              onBlur={formik.handleBlur}
              name="password"
              type="password"
              errormsg={formik.touched.password && formik.errors.password}
            />
            <Dropdown
              value={formik.values.role}
              onChange={formik.handleChange}
              labelText="Role"
              name="role"
              placeholder="Choose User Role"
              errorMsg={formik.touched.role && formik.errors.role}
              required={true}
              onBlur={formik.handleBlur}
              data={[
                { name: "Admin", value: "Admin" },
                { name: "User", value: "User" },
              ]}
            />
            <InputField
              label="Phone Number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              placeholder="Enter PhoneNumber"
              onBlur={formik.handleBlur}
              name="phone_number"
              required={true}
              type="text"
              errormsg={
                formik.touched.phone_number && formik.errors.phone_number
              }
            />
          </div>
          <div className="register-input-con">
            <InputField
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              placeholder="Enter Address"
              onBlur={formik.handleBlur}
              required={true}
              name="address"
              type="text"
              errormsg={formik.touched.address && formik.errors.address}
            />
            <Dropdown
              value={formik.values.country}
              onChange={formik.handleChange}
              labelText="Country"
              name="country"
              placeholder="Choose Country"
              errorMsg={formik.touched.country && formik.errors.country}
              required={true}
              onBlur={formik.handleBlur}
              data={Country.getAllCountries()}
              setValue="isoCode"
            />
            <Dropdown
              value={formik.values.state}
              onChange={formik.handleChange}
              labelText="State"
              name="state"
              placeholder="Choose State"
              errorMsg={formik.touched.state && formik.errors.state}
              required={true}
              onBlur={formik.handleBlur}
              data={
                formik.values.country
                  ? State.getStatesOfCountry(formik.values?.country)
                  : []
              }
            />
            <InputField
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              placeholder="Enter City"
              required={true}
              onBlur={formik.handleBlur}
              name="city"
              type="text"
              errormsg={formik.touched.city && formik.errors.city}
            />
            <InputField
              label="Zipcode"
              value={formik.values.zip_code}
              onChange={formik.handleChange}
              placeholder="Enter Zipcode"
              required={true}
              onBlur={formik.handleBlur}
              name="zip_code"
              type="number"
              errormsg={formik.touched.zip_code && formik.errors.zip_code}
            />
            <CustomButton mt="10px">Register</CustomButton>
            <p onClick={() => navigate("/login")} className="login-para">
              Already have account? Sign In
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
