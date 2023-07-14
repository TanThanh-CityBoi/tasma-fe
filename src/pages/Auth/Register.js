import React, { useContext } from "react";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { REGISTER_SAGA } from "../../redux/constants/AuthConst";

//for login to firebase
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../Project/ChatApp/context/userContext";
import { AVATARS_DEFAULT } from "../../util/config/constants";

function Register(props) {
  //login to firebase:
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignUpForFirebase = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Đăng ký thành công, lưu thông tin người dùng vào state
        setCurrentUser(userCredential.user);
        addMember(userCredential.user.email, userCredential.user.uid);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  // Hàm thêm thành viên
  const addMember = (email, firebaseId) => {
    // Tham chiếu đến bảng "members" trong Firebase Realtime Database
    const membersRef = firebase.database().ref("members");

    // Thực hiện thêm thành viên mới
    const newMemberRef = membersRef.push();
    newMemberRef
      .set({
        email: email,
        firebaseId: firebaseId,
      })
      .then(() => {
        console.log("Thêm thành viên thành công");
      })
      .catch((error) => {
        console.log("Lỗi khi thêm thành viên:", error);
      });
  };

  const handleSubmit = (values) => {
    let { email, password } = values;
    dispatch({
      type: REGISTER_SAGA,
      userRegister: {
        login: email,
        email,
        imageUrl: AVATARS_DEFAULT[Math.floor(Math.random() * 11)],
        password: password,
      },
    });
    handleSignUpForFirebase(email, password);
  };

  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required!"),
      password: Yup.string().min(
        4,
        "Your password must be at least 4 characters!"
      ),
      rePassword: Yup.string().when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password do not match!"
        ),
      }),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <form
      className="text-center p-5"
      style={{ maxWidth: 400, margin: "auto", marginTop: 130 }}
      onSubmit={formik.handleSubmit}
    >
      <div>
        <h3 style={{ fontWeight: "bold", fontSize: 35 }}>Register</h3>
        <div className="d-flex mt-4">
          <Input
            style={{ width: "100%" }}
            name="email"
            type="email"
            size="large"
            placeholder="email"
            prefix={<UserOutlined />}
            onChange={formik.handleChange}
            value={formik.values.email}
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
            value={formik.values.password}
          />
        </div>
        {formik.errors.password && formik.touched.password && (
          <div className="d-flex text-danger">{formik.errors.password}</div>
        )}
        <div className="d-flex mt-3">
          <Input
            style={{ width: "100%" }}
            name="rePassword"
            type="password"
            size="large"
            placeholder="Re-Password"
            prefix={<LockOutlined />}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
          />
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div className="d-flex text-danger">{formik.errors.rePassword}</div>
        )}
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
          REGISTER
        </Button>
        <div className="mt-3">
          Already have an account?{" "}
          <NavLink to="/login" className="mt-3">
            Login here
          </NavLink>
        </div>
      </div>
    </form>
  );
}

export default Register;
