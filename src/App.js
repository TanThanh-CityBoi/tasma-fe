import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

// import ViewTaskModal from "./pages/Project/Modal/ViewTaskModal";
// import CreateTaskModal from "./pages/Project/Modal/CreateTaskModal";
// import EditProjectDrawer from "./pages/Project/Drawer/EditProjectDrawer";
// import ViewProjectModal from "./pages/Project/Modal/ViewProjectModal";
// import Loading from "./components/Loading/Loading";
import { AuthTemplate } from "./templates/AuthTemplate/AuthTemplate";

const Login = React.lazy(() => import("./pages/Auth/Login"));
const Register = React.lazy(() => import("./pages/Auth/Register"));

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

        {/* <JiraBugsTemplate
            exact
            path="/project/board/:id"
            Component={Board}
            title="Kanban Board"
          />
          <JiraBugsTemplate
            exact
            path="/project-management/settings"
            Component={ProjectSetting}
            title="Project Settings"
          />

          <JiraBugsTemplate
            exact
            path="/project-management"
            Component={ProjectManagement}
            title="Project Management"
          />

          <JiraBugsTemplate
            exact
            path="/account"
            Component={Account}
            title="Account"
          /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
