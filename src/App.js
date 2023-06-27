import './App.css';
import { Router, Switch } from 'react-router-dom';
import Register from './pages/Auth/Register';
import { history } from './util/libs/history';

import { JiraBugsTemplate } from './templates/JiraBugsTemplate/JiraBugsTemplate';
import { AuthTemplate } from './templates/AuthTemplate/AuthTemplate';
import EditProjectDrawer from './pages/Project/Drawer/EditProjectDrawer';
import ViewProjectModal from './pages/Project/Modal/ViewProjectModal';
import CreateTaskModal from './pages/Project/Modal/CreateTaskModal';
import ViewTaskModal from './pages/Project/Modal/ViewTaskModal';
import Loading from './components/GlobalSetting/Loading/Loading';

import ProjectManagement from './pages/Project/ProjectManagement/ProjectManagement';
import ProjectSetting from './pages/Project/Settings/ProjectSetting';
import Board from './pages/Project/Board/Board';
import Account from './pages/Auth/Account';
import Login from './pages/Auth/Login';
import Chat from './pages/Project/ChatApp/Chat';
import { ChatProvider } from './pages/Project/ChatApp/context/chatContext';
import { UserProvider } from './pages/Project/ChatApp/context/userContext';
import Chart from './pages/Project/Chart/Chart';

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
          <AuthTemplate exact path='/login' Component={Login} />
          <AuthTemplate exact path='/register' Component={Register} />

          <JiraBugsTemplate exact path="/chart" Component={Chart} title="Dashboard" />
          <JiraBugsTemplate exact path="/chatapp" Component={Chat} title="Chat" />
          {/* Jira Bugs Template */}
          <JiraBugsTemplate exact path="/project/board/:id" Component={Board} title="Board" />

          {/* Project Management */}
          <JiraBugsTemplate exact path="/project-management" Component={ProjectManagement} title="Project Management" />
          <JiraBugsTemplate exact path="/project-management/settings" Component={ProjectSetting} title="Project Settings" />

          {/* Project Management */}
          <JiraBugsTemplate exact path="/account" Component={Account} title="Account" />

          <AuthTemplate path='/' Component={Login} />

          {/* Project Management */}
          <JiraBugsTemplate exact path="/account" Component={Account} title="Account" />

          <AuthTemplate path='/' Component={Login} />
          {/* <JiraBugsTemplate exact path="/" Component={Board} title="Board" /> */}
        </Switch>
      </UserProvider>
    </Router>
  );
}

export default App;
