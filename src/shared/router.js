import { Login } from "../pages/login";
import { Nomatch } from "../pages/nomatch";
import { Homepage } from "../pages/Homepage";
import { Course } from "../pages/Course";
import { AssignTA } from "../pages/Assign_ta";
import { AssignCouse } from "../pages/Assigned_course";
import { AssignCourse } from "../pages/Assign_course";
import { AvaliableCourse } from "../pages/Available_course";
import { ApproveRequest } from "../pages/Approve_request";
import { ApproveTa } from "../pages/Approve_ta";

export const routers = [
  {
    path: "/home",
    name: "Homepage",
    exact: true,
    component: Homepage,
  },
  {
    path: "/course",
    name: "Course",
    exact: true,
    component: Course,
  },
  {
    path: "/assign_ta",
    name: "Assign_ta",
    exact: true,
    component: AssignTA,
  },
  {
    path: "/assigned_course",
    name: "Assigned_course",
    exact: true,
    component: AssignCouse,
  },
  {
    path: "/assign_course",
    name: "assign_course",
    exact: true,
    component: AssignCourse,
  },
  {
    path: "/available_course",
    name: "available_course",
    exact: true,
    component: AvaliableCourse,
  },
  {
    path: "/approve_request",
    name: "approve_request",
    exact: true,
    component: ApproveRequest,
  },
  {
    path: "/approve_ta",
    name: "approve_ta",
    exact: true,
    component: ApproveTa,
  },
  // {
  //     path:'*',
  //     name:'not match',
  //     component:Nomatch,
  // }
];
