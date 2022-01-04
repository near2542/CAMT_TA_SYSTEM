import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';

export const AdminMenuList = [
    {route:'/course',icon:<MenuBookIcon/>,name:'Course'},
    {route:'/assign_course',icon:<MenuBookIcon/>,name:'Assign Course'},
    {route:'/available_course',icon:<MenuBookIcon/>,name:'Available Course'},
    {route:'/approve_request',icon:<MenuBookIcon/>,name:'Approve Teacher Request'},
    {route:'/teacher',icon:<MenuBookIcon/>,name:'Teacher List'},
    {route:'/approve_ta',icon:<MenuBookIcon/>,name:'Approve TA'},
    {route:'/approved_ta',icon:<MenuBookIcon/>,name:'Approved TA'},

      ]

export const TeacherMenuList = [
  {route:'/course',icon:<MenuBookIcon/>,name:'Course'},
  {route:'/assign_course',icon:<MenuBookIcon/>,name:'Assign Course'},
  {route:'/available_course',icon:<MenuBookIcon/>,name:'Available Course'},
  {route:'/approve_ta',icon:<MenuBookIcon/>,name:'Approve TA'},
  {route:'/request_ta',icon:<MenuBookIcon/>,name:'Request TA'},
  {route:'/approved_ta',icon:<MenuBookIcon/>,name:'Approved TA'},
  
    ]

export const TAMenuList = [
  {route:'/assign_ta',icon:<MenuBookIcon/>,name:'Assign For Job'},
  {route:'/assigned_course',icon:<MenuBookIcon/>,name:'Approval Status'},
    ]

export const DefaultList = [
  {route:'/logout',icon:<MenuBookIcon/>,name:'Logout'},
  
]

