import React, { useContext } from "react";
import { Button, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/actions/AuthAction/LoginAction";

//for login to firebase
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from "../Project/ChatApp/context/userContext";

function Login() {
  //login to firebase:
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const dispatch = useDispatch();

  const handleLoginToFirebase = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Đăng nhập thành công, lưu thông tin người dùng vào state
        // setUser(userCredential.user);
        console.log("User đã đăng nhập là: " + userCredential.user);
        const newCurrentUser = userCredential.user;
        setCurrentUser(newCurrentUser);
        console.log(userCredential.user.uid);
        console.log(password);
        const currentUserFirebase = {
          userEmail: email,
          userId: userCredential.user.uid,
        };
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem(
          "currentUserFirebase",
          JSON.stringify(currentUserFirebase)
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleSubmitLogin = (values) => {
    const { email, password } = values;
    dispatch(loginAction(email, password));
    handleLoginToFirebase(email, password);
  };

  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required!"),
      password: Yup.string().min(
        6,
        "Your password must be at least 6 characters!"
      ),
    }),
    onSubmit: (values) => {
      handleSubmitLogin(values);
    },
  });

  return (
    <form
      className="text-center p-5"
      style={{ maxWidth: 400, margin: "auto", marginTop: 130 }}
      onSubmit={formik.handleSubmit}
    >
      <div>
        <h3 style={{ fontWeight: "bold", fontSize: 35 }}>Tasma Login</h3>
        <div className="d-flex mt-4">
          <Input
            style={{ width: "100%" }}
            name="email"
            size="large"
            placeholder="Email"
            prefix={<UserOutlined />}
            onChange={formik.handleChange}
          />
        </div>
        {formik.errors.email && formik.touched.email && (
          <div className="d-flex text-danger">{formik.errors.email}</div>
        )}
        <div className="d-flex mt-3">
          <Input
            style={{ width: "100%" }}
            name="password"
            type="password"
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
            onChange={formik.handleChange}
          />
        </div>
        {formik.errors.password && formik.touched.password && (
          <div className="d-flex text-danger">{formik.errors.password}</div>
        )}
        <div className="mt-3">
          <a href="forgot-password">Forgot your password?</a>
        </div>
        <Button
          htmlType="submit"
          size="large"
          style={{
            width: "100%",
            backgroundColor: "rgb(102,117,223)",
            color: "#fff",
            fontWeight: "bold",
          }}
          className="mt-3"
        >
          LOGIN
        </Button>
        <div className="mt-3">
          Not registered?{" "}
          <NavLink to="register" className="mt-3">
            Create an account
          </NavLink>
        </div>
      </div>
    </form>
  );
}

export default Login;
