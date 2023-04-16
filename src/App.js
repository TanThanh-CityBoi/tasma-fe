import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

// import ViewTaskModal from "./pages/Project/Modal/ViewTaskModal";
// import CreateTaskModal from "./pages/Project/Modal/CreateTaskModal";
// import EditProjectDrawer from "./pages/Project/Drawer/EditProjectDrawer";
// import ViewProjectModal from "./pages/Project/Modal/ViewProjectModal";
// import Loading from "./components/Loading/Loading";
import { AuthTemplate } from "./templates/AuthTemplate/AuthTemplate";
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

// const Login = React.lazy(() => import("./pages/Auth/Login"));
// const Register = React.lazy(() => import("./pages/Auth/Register"));

function App() {
  return (
    <BrowserRouter>
      {/* <Loading />
      <ViewProjectModal />
      <EditProjectDrawer />
      <CreateTaskModal />
      <ViewTaskModal /> */}
      <Routes>
        {/* <Routes path="/" element={<AuthTemplate />}> */}
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        {/* </Routes> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
