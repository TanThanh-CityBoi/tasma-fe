import { DownOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { USER_LOGIN_LOCAL_STORAGE } from "../../../util/config/constants";
import { history } from "../../../util/libs/history";

export default function Header(props) {
   // const handleButtonClick = (e) => {
   //     message.info('Click on left button.');
   //     console.log('click left button', e);
   // }
   let userLogin = {
      login: "Account",
      imageUrl: "",
   };
   if (localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) {
      userLogin = { ...JSON.parse(localStorage.getItem(USER_LOGIN_LOCAL_STORAGE)) };
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
      <div className="header mt-4" style={{ display: "flex", justifyContent: "space-between" }}>
         <div>
            <nav aria-label="breadcrumb">
               <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
                  <li className="breadcrumb-item">Tasma</li>
                  {/* <li className="breadcrumb-item">Project</li> */}
                  <li className="breadcrumb-item active" aria-current="page">
                     {props.title}
                  </li>
               </ol>
            </nav>
         </div>
         <div></div>
         <div>
            <Dropdown overlay={menu}>
               {/* <Button icon={<Avatar src="https://joeschmoe.io/api/v1/random" style={{ width: 30, height: 30 }} />} style={{ padding: '0px 6px', height: 36 }}>
                        <span></span><DownOutlined />
                    </Button> */}
               <button className="btn">
                  <i>
                     {userLogin.imageUrl === "" || userLogin.imageUrl === null ? (
                        <Avatar icon={<i className="fa fa-user-alt"></i>} />
                     ) : (
                        <Avatar src={userLogin.imageUrl} style={{ width: 30, height: 30 }} />
                     )}
                  </i>
                  <span className="ml-2 p-1">{userLogin.login}</span>
                  <DownOutlined />
               </button>
            </Dropdown>
         </div>
      </div>
   );
}
