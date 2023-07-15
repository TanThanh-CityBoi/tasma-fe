import "./App.css";
import { Router, Switch } from "react-router-dom";
import Register from "./pages/Auth/Register";
import { history } from "./util/libs/history";

import { JiraBugsTemplate } from "./templates/JiraBugsTemplate/JiraBugsTemplate";
import { AuthTemplate } from "./templates/AuthTemplate/AuthTemplate";
import EditProjectDrawer from "./pages/Project/Drawer/EditProjectDrawer";
import ViewProjectModal from "./pages/Project/Modal/ViewProjectModal";
import CreateTaskModal from "./pages/Project/Modal/CreateTaskModal";
import ViewTaskModal from "./pages/Project/Modal/ViewTaskModal";
import Loading from "./components/GlobalSetting/Loading/Loading";

import ProjectManagement from "./pages/Project/ProjectManagement/ProjectManagement";
import ProjectSetting from "./pages/Project/Settings/ProjectSetting";
import Board from "./pages/Project/Board/Board";
import Calendar from "./pages/Project/Calendar/Calender";
import ChatBot from "./pages/Project/Chatbot/Chatbot";

import Account from "./pages/Auth/Account";
import Login from "./pages/Auth/Login";
import Chat from "./pages/Project/ChatApp/Chat";
import { UserProvider } from "./pages/Project/ChatApp/context/userContext";
import Chart from "./pages/Project/Chart/Chart";
import PomodoroTimer from "./pages/Project/PomodoroTimer/PomodoroTimer";

function App() {
  return (
    <Router history={history}>
      <Loading />
      <ViewProjectModal />
      <EditProjectDrawer />
      <CreateTaskModal />
      <ViewTaskModal />
      <UserProvider>
        <Switch>
          {/* AuthTemplate */}
          <AuthTemplate exact path="/login" Component={Login} />
          <AuthTemplate exact path="/register" Component={Register} />

          <JiraBugsTemplate
            exact
            path="/pomodoro"
            Component={PomodoroTimer}
            title="Tasma Todolist"
          />
          <JiraBugsTemplate
            exact
            path="/chart"
            Component={Chart}
            title="Dashboard"
          />
          <JiraBugsTemplate
            exact
            path="/chatapp"
            Component={Chat}
            title="Chat Room"
          />
          <JiraBugsTemplate
            exact
            path="/chatbot"
            Component={ChatBot}
            title="Ai Support"
          />

          {/* Jira Bugs Template */}
          <JiraBugsTemplate
            exact
            path="/project/board/:id"
            Component={Board}
            title="Board"
          />
          <JiraBugsTemplate
            exact
            path="/project/calendar"
            Component={Calendar}
            title="Calendar"
          />

          {/* Project Management */}
          <JiraBugsTemplate
            exact
            path="/project-management"
            Component={ProjectManagement}
            title="Project Management"
          />
          <JiraBugsTemplate
            exact
            path="/project-management/settings"
            Component={ProjectSetting}
            title="Project Settings"
          />

          {/* Project Management */}
          <JiraBugsTemplate
            exact
            path="/account"
            Component={Account}
            title="Account"
          />

          <AuthTemplate path="/" Component={Login} />
        </Switch>
      </UserProvider>
    </Router>
  );
}

export default App;
