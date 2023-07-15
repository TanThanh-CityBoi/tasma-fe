import { Input, Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_USER_SAGA } from "../../redux/constants/UserConst";
import { USER_LOGIN_LOCAL_STORAGE } from "../../util/config/constants";
import { openNotification } from "./../../util/notification/notification";
import { CloudinaryConfig } from "./../../util/libs/cloudinary";
import { TbPhotoSensor2 } from "react-icons/tb";

export default function Account(props) {
  const dispatch = useDispatch();

  let userLoginLocal = {};

  if (localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) {
    userLoginLocal = {
      ...JSON.parse(localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)),
    };
  }

  const [imgUrl, setImgUrl] = useState(userLoginLocal.imageUrl || "");
  const [file, setFile] = useState(null);

  const [userLogin, setUserLogin] = useState({
    values: {
      id: userLoginLocal.id,
      firstName: userLoginLocal.firstName,
      lastName: userLoginLocal.lastName,
      email: userLoginLocal.email,
      newPassword: "",
      imageUrl: userLoginLocal.imageUrl,
    },
    errors: {
      firstName: "",
      lastName: "",
      email: "",
      newPassword: "",
    },
  });

  const handleFileChange = (e) => {
    const fileSelected = e.target.files[0];
    if (typeof fileSelected === "undefined") {
      setImgUrl(props.avatar);
      setFile(null);
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
      };
      if (fileSelected.type.match(/image.*/)) {
        setFile(e.target.files[0]);
        reader.readAsDataURL(fileSelected);
      } else {
        // toast
        openNotification("error", "File is not an image");
      }
    }
  };

  const uploadImg = async (imgSelected) => {
    if (typeof imgSelected === "undefined" || imgSelected === null) {
      openNotification("error", "File is not an image");
      return;
    }
    console.log("Upload ");

    ///
    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      CloudinaryConfig.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", CloudinaryConfig.REACT_APP_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "tasma");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CloudinaryConfig.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      dispatch({
        type: UPDATE_USER_SAGA,
        userUpdate: { ...userLogin.values, imageUrl: res.secure_url },
      });
      // openNotification("success", "Upload image successfully");
    } catch (error) {
      openNotification("error", "Upload image failed");
    }
  };

  const handleOnChange = (e) => {
    const { type, name, value } = e.target;

    setUserLogin({
      ...userLogin,
      values: { ...userLogin.values, [name]: value },
    });
  };

  return (
    <div className="row mt-5 ml-4">
      <div
        className="col-3 text-center"
        style={{
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          padding: 30,
        }}
      >
        <div>
          {userLoginLocal.imageUrl === "" ||
          userLoginLocal.imageUrl === null ? (
            <Avatar
              icon={
                <i
                  className="fa fa-user-alt"
                  style={{ fontSize: 60, marginTop: 12 }}
                ></i>
              }
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <Avatar
              src={imgUrl || userLoginLocal.imageUrl}
              style={{ width: 100, height: 100 }}
            />
          )}
        </div>

        <div style={{ fontSize: 20, fontWeight: "bold" }}>
          {userLogin.login}
        </div>

        <div className="mt-3">
          <label
            htmlFor="input-file"
            className="px-3 py-1"
            style={{ border: "solid 1px #d9d9d9" }}
          >
            <TbPhotoSensor2 size={20} />
          </label>
          <Button
            style={{ backgroundColor: "#6675df", color: "white" }}
            onClick={() => {
              if (imgUrl !== userLoginLocal.imageUrl) {
                uploadImg(file);
              }
            }}
          >
            Upload
          </Button>
          <input
            className="ml-4"
            id="input-file"
            style={{ display: "none" }}
            type="file"
            onChange={handleFileChange}
          />
          <br></br>
        </div>
      </div>

      <div
        className="col-6"
        style={{
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          padding: 30,
          marginLeft: 30,
        }}
      >
        <div>
          <div className="mb-3">
            <label className="form-label">First name</label>
            <Input
              type="text"
              name="firstName"
              className="form-control"
              value={userLogin.values.firstName}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last name</label>
            <Input
              type="text"
              name="lastName"
              className="form-control"
              value={userLogin.values.lastName}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <Input
              type="email"
              name="email"
              className="form-control"
              value={userLogin.values.email}
              placeholder="email@example.com"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New password</label>
            <Input
              type="password"
              name="newPassword"
              className="form-control"
              onChange={handleOnChange}
            />
          </div>
          <Button
            className="mt-3"
            onClick={async () => {
              dispatch({
                type: UPDATE_USER_SAGA,
                userUpdate: { ...userLogin.values },
              });
            }}
            style={{ backgroundColor: "#6675df", color: "white" }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
