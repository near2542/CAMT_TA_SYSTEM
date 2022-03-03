
import './App.css';
import {
  Routes,
  Route,
  Navigate
  // Switch,
} from "react-router-dom";
import { Login } from './pages/login';
import { Register } from './pages/register';
import ProtectedRoute from './pages/components/ProtectedRoute'
import { Homepage } from './pages/Homepage'
import { Course } from './pages/Course';
import { AssignTA } from './pages/Assign_ta'
import { AssignCouse } from "./pages/Assigned_course";
import { AssignCourse } from "./pages/Assign_course";
import { AvaliableCourse } from "./pages/Available_course";
import { ApproveRequest } from "./pages/Approve_request";
import { ApproveTa } from "./pages/Approve_ta";
import { Teacher } from './pages/Teacher';
import { RequestTA } from './pages/Request_ta';
import { Logout } from './pages/logout';
import { RegisterJob } from "./pages/register_job";
import { ApprovedList } from './pages/Approve_list';
function App() {
  return (

    <Routes>
      <Route path="/" >
       
        <Route
          path='auth'
          element={<Login/>}
        />
        <Route
          path='register'

          element={<Register/>}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="home" element={<Homepage/>} />
          <Route path="course" element={<Course/>} />
          <Route path="assign_ta" element={<AssignTA/>} />
          <Route path="assign_course" element={<AssignCourse/>} />
          <Route path="assigned_course" element={<AssignCouse/>} />
          <Route path="teacher" element={<Teacher/>} />
          <Route path="request_ta" element={<RequestTA/>} />
          <Route path="available_course" element={<AvaliableCourse/>} />
          <Route path="approve_request" element={<ApproveRequest/>} />
          <Route path="approve_ta" element={<ApproveTa/>} />
          <Route path="logout" element={<Logout/>} />
          <Route path="register_job" element={<RegisterJob/>} />
          <Route path="approve_request" element={<ApproveRequest/>} />
          <Route path="approved_ta" element={<ApprovedList/>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />

      </Route>
    </Routes>

  );
}

export default App;
