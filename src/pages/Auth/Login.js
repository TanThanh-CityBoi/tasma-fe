import React, { useContext, useState } from 'react';
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { loginAction } from '../../redux/actions/AuthAction/LoginAction';

//for login to firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../Project/ChatApp/context/userContext';


function Login(props) {
    //login to firebase:
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            console.log(userCredential.user.email);
            console.log(password);
            const currentUserFirebase = {
                userEmail: email,
                userId: userCredential.user.uid
            }
            // Lưu thông tin người dùng vào localStorage
            localStorage.setItem('currentUserFirebase', JSON.stringify(currentUserFirebase));
            history.push("/chatapp");
      })
      .catch((error) => {
        alert(error.message);
      });
    };
    const handleSubmitLogin = () => {
        handleLoginToFirebase(email, password);
    }

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
                <h3 style={{ fontWeight: 'bold', fontSize: 35 }}>Tasma Login</h3>
                <div className="d-flex mt-4" >
                    <Input style={{ width: '100%' }} name="username" size="large" placeholder="Username" prefix={<UserOutlined />}
                        // onChange={ handleChange}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="d-flex text-danger">{errors.username}</div>
                <div className="d-flex mt-3">
                    <Input style={{ width: '100%' }} name="password" type="password" size="large" placeholder="Password" prefix={<LockOutlined />}
                        // onChange={handleChange}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="d-flex text-danger">{errors.password}</div>
                <div className="mt-3">
                    <a href="forgot-password">Forgot your password?</a>
                </div>
                <Button onClick={handleSubmitLogin}
                 htmlType="submit" size="large" style={{ width: '100%', backgroundColor: 'rgb(102,117,223)', color: '#fff', fontWeight: 'bold' }} className="mt-3">
                    LOGIN
                </Button>
                <div className="mt-3">Not registered? <NavLink to="register" className="mt-3">Create an account</NavLink></div>
            </div>
        </form>
    )
}

const LoginWithFormik = withFormik({
    mapPropsToValues: () => ({
        username: '',
        password: '',
    }),
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Username is required!'),
        password: Yup.string().min(4, 'Your password must be at least 4 characters!'),
    }),

    handleSubmit: (values, { setSubmitting, props }) => {
        let { username, password } = values;
        setSubmitting(true);
        props.dispatch(loginAction(username, password));
    },
    displayName: 'Jira Bugs Login',
})(Login);

export default connect()(LoginWithFormik);
