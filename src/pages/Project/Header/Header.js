import { BsCaretDown } from "react-icons/bs";
import { Avatar, Button, Dropdown, Menu } from "antd";
import React from "react";
import { USER_LOGIN_LOCAL_STORAGE } from "../../../util/config/constants";
import { history } from "../../../util/libs/history";

export default function Header(props) {

  let userLogin = {
    login: "Account",
    imageUrl: "",
  };
  if (localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) {
    userLogin = {
      ...JSON.parse(localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)),
    };
  }

  const handleMenuClick = (e) => {
    console.log("click", e);
  };
  const handleSignOut = () => {
    localStorage.removeItem("currentUserFirebase");
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" style={{ display: "flex" }}>
        <Button
          onClick={() => {
            history.push("/account");
          }}
          style={{ width: "100%" }}
        >
          <div>
            <i className="fa fa-user"></i>
            <span className="ml-3">Account</span>
          </div>
        </Button>
      </Menu.Item>

      <Menu.Item key="2">
        <Button
          onClick={() => {
            localStorage.clear();
            history.push("/login");
          }}
          style={{ width: "100%" }}
        >
          <div>
            <i className="fa fa-sign-out-alt"></i>
            <span className="ml-2 pl-1">Logout</span>
          </div>
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className="header mt-4"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
            <li className="breadcrumb-item">Tasma</li>
            <li className="breadcrumb-item active" aria-current="page">
              {props.title}
            </li>
          </ol>
        </nav>
      </div>
      <div></div>
      <div>
        <Dropdown overlay={menu}>
          <button className="btn">
            <span>
              <span className="mr-2 p-1">{userLogin?.firstName ? userLogin?.firstName + " " + userLogin?.lastName : userLogin.login}</span>
            </span>
            <i className="mr-1">
              {userLogin.imageUrl === "" || userLogin.imageUrl === null ? (
                <Avatar icon={<i className="fa fa-user-alt"></i>} />
              ) : (
                <Avatar
                  src={userLogin.imageUrl}
                  style={{ width: 30, height: 30 }}
                />
              )}
            </i>
            <BsCaretDown />
          </button>
        </Dropdown>
      </div>
    </div>
  );
}
