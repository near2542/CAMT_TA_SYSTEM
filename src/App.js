
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect

} from "react-router-dom";
import { routers } from './shared/router'
import { Login } from './pages/login';
import { Register } from './pages/register';
import ResponsiveDrawer from './pages/components/sidebar';
import ReturnToAuth from './pages/returnAuth';
import ProtectedRoute from './pages/components/ProtectedRoute'
import UnprotectedRoute from './pages/components/UnprotectedRoute'
import AuthLayer from './pages/components/Authlayer'
import {Homepage} from './pages/Homepage'
import { Course } from 'pages/Course';
import { AssignTA} from 'pages/Assign_ta'
import {useSelector} from 'react-redux'
import { AssignCouse } from "./pages/Assigned_course";
import { AssignCourse } from "./pages/Assign_course";
import { AvaliableCourse } from "./pages/Available_course";
import { ApproveRequest } from "./pages/Approve_request";
import { ApproveTa } from "./pages/Approve_ta";
import {Teacher} from './pages/Teacher';
import {RequestTA} from './pages/Request_ta';
import {Logout} from './pages/logout';
import { RegisterJob } from "./pages/register_job";
import {Approved_list} from './pages/Approve_list';
function App() {
  
  return (
    <>
      <Router>
  
      <Switch>
      
      
        
          <ResponsiveDrawer>
              {/* {routers.map(route =>
                <Route
                  key={route.name}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />)} */}
            <ProtectedRoute exact path="/home" component={Homepage}/>
            <ProtectedRoute exact path="/course" component={Course}/>
            <ProtectedRoute exact path="/assign_ta" component={AssignTA}/>
            <ProtectedRoute exact path="/assign_course" component={AssignCourse}/>
            <ProtectedRoute exact path="/assigned_course" component={AssignCouse}/>
            <ProtectedRoute exact path="/teacher" component={Teacher}/>
            <ProtectedRoute exact path="/request_ta" component={RequestTA}/>
            <ProtectedRoute exact path="/available_course" component={AvaliableCourse}/>
            <ProtectedRoute exact path="/approve_request" component={ApproveRequest}/>
            <ProtectedRoute exact path="/approve_ta" component={ApproveTa}/>
            <ProtectedRoute exact path="/logout" component={Logout}/>
            <ProtectedRoute exact path="/register_job" component={RegisterJob}/>
            <ProtectedRoute exact path="/approve_request" component={ApproveRequest}/>
            <ProtectedRoute exact path="/approved_ta" component={Approved_list}/>
          </ResponsiveDrawer>
     
        </Switch>
        <Switch>
        <Route
          path='/auth'
          exact
          component={Login}
        />
        <Route
          path='/register'
          exact
          component={Register}
        />
          </Switch>
        <Redirect from="*" to="/auth" />
            
      </Router>
    </>
  );
}

export default App;
