import React from 'react';
import { Outlet } from "react-router-dom";

const AuthTemplate = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: "url(./images/auth_background.png)",
          height: window.innerHeight,
        }}
      >
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default React.memo(AuthTemplate);