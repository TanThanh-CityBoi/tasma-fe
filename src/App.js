import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";

// import ViewTaskModal from "./pages/Project/Modal/ViewTaskModal";
// import CreateTaskModal from "./pages/Project/Modal/CreateTaskModal";
// import EditProjectDrawer from "./pages/Project/Drawer/EditProjectDrawer";
// import ViewProjectModal from "./pages/Project/Modal/ViewProjectModal";
// import Loading from "./components/Loading/Loading";

import JiraBugsTemplate from "./templates/JiraBugsTemplate/JiraBugsTemplate";
import AuthTemplate from "./templates/AuthTemplate/AuthTemplate";

import ProjectManagement from "./pages/Project/ProjectManagement/ProjectManagement";
import ProjectSetting from "./pages/Project/Settings/ProjectSetting";
import Register from "./pages/Auth/Register";
import Account from "./pages/Auth/Account";
import Board from "./pages/Project/Board/Board";
import Login from "./pages/Auth/Login";

function App() {
  return (
    <BrowserRouter>
      {/* <Loading />
      <ViewProjectModal />
      <EditProjectDrawer />
      <CreateTaskModal />
      <ViewTaskModal /> */}
      <Routes>
        <Route path="/" element={<AuthTemplate />}>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route
          path="/project/board/:id"
          element={<JiraBugsTemplate title="Kanban Board" />}
        >
          <Route index element={<Board />} />
        </Route>

        <Route
          path="/project-management"
          element={<JiraBugsTemplate title="Project Management" />}
        >
          <Route index element={<ProjectManagement />} />
        </Route>

        <Route
          path="/project-management/settings"
          element={<JiraBugsTemplate title="Project Settings" />}
        >
          <Route index element={<ProjectSetting />} />
        </Route>

        <Route path="/account" element={<JiraBugsTemplate title="Account" />}>
          <Route index element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
