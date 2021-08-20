import { Login } from '../pages/login';
import { Nomatch } from '../pages/nomatch';
import { Homepage } from '../pages/Homepage'
import { Course } from '../pages/Course'


export const routers= [
 
    {
        path: '/home',
        name: 'Homepage',
        exact:true,
        component: Homepage,
    },
    {
        path:'/course',
        name:'Course',
        exact:true,
        component:Course,
    },

    {
        path:'*',
        name:'not match',
        component:Nomatch,
    }
]

