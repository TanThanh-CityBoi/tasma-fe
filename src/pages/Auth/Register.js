import React, { useContext, useState } from 'react';
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { REGISTER_SAGA } from '../../redux/constants/AuthConst';

//for login to firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../Project/ChatApp/context/userContext';

function Register(props) {

    //login to firebase:
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const history = useHistory();


    const handleSignUpForFirebase = (email, password) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Đăng ký thành công, lưu thông tin người dùng vào state
            setCurrentUser(userCredential.user);
            console.log("Thong tin dang ky: ")
            console.log(userCredential.user.uid);
            console.log(userCredential.user.email);
            addMember(userCredential.user.email, userCredential.user.uid);
          })
          .catch((error) => {
            alert(error.message);
          });
    };
    // Hàm thêm thành viên
    const addMember = (email, firebaseId) => {
        // Tham chiếu đến bảng "members" trong Firebase Realtime Database
        const membersRef = firebase.database().ref('members');

        // Thực hiện thêm thành viên mới
        const newMemberRef = membersRef.push();
        newMemberRef.set({
        email: email,
        firebaseId: firebaseId,
        })
        .then(() => {
            console.log('Thêm thành viên thành công');
        })
        .catch((error) => {
            console.log('Lỗi khi thêm thành viên:', error);
        });
    };
    const handleInputChange = (event) => {
        const { username, password, rePassword } = event.target;
        if (password === rePassword) {
            handleSignUpForFirebase(username, password);
        }
      };


    const {
        errors,
        handleChange,
        handleSubmit,
        // values,
        // touched,
        // handleBlur,
    } = props;

    return (
        <form className="text-center p-5" style={{ maxWidth: 400, margin: 'auto', marginTop: 130 }} onSubmit={handleSubmit}>
            <div>
                <h3 style={{ fontWeight: 'bold', fontSize: 35 }}>Register</h3>
                <div className="d-flex mt-4" >
                    <Input style={{ width: '100%' }} name="username" type="username" size="large" placeholder="Username" prefix={<UserOutlined />}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex text-danger">{errors.username}</div>
                <div className="d-flex mt-3">
                    <Input style={{ width: '100%' }} name="password" type="password" size="large" placeholder="Password" prefix={<LockOutlined />}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex text-danger">{errors.password}</div>
                <div className="d-flex mt-3">
                    <Input style={{ width: '100%' }} name="rePassword" type="password" size="large" placeholder="Re-Password" prefix={<LockOutlined />}
                        onChange={handleChange} />
                </div>
                <div className="d-flex text-danger">{errors.rePassword}</div>
                <Button htmlType="submit" size="large" style={{ width: '100%', backgroundColor: 'rgb(102,117,223)', color: '#fff', fontWeight: 'bold' }} className="mt-3">
                    REGISTER
                </Button>
                <div className="mt-3">Already have an account? <NavLink to="/login" className="mt-3">Login here</NavLink></div>
            </div>
        </form>
    )
}

const RegisterWithFormik = withFormik({
    mapPropsToValues: () => ({
        username: '',
        password: '',
        rePassword: '',
    }),
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Username is required!'),
        password: Yup.string().min(4, 'Your password must be at least 4 characters!'),
        rePassword: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Password do not match!"
            )
        })
    }),

    handleSubmit: (values, { setSubmitting, props }) => {
        let { username, password } = values;
        setSubmitting(true);
        props.dispatch({
            type: REGISTER_SAGA,
            userRegister: {
                login: username,
                password: password,
            }
        })
    },

    displayName: 'Jira Bugs Register',
})(Register);

export default connect()(RegisterWithFormik);
