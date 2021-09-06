
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {routers} from './shared/router'
import {Login} from './pages/login';
import {Register} from './pages/register';
import {useHistory,useLocation} from 'react-router-dom'
import ResponsiveDrawer  from './pages/components/sidebar';
import {useSelector} from 'react-redux'
function App() {
  const test = useHistory();
  const state= useSelector((state)=> state.auth)
  return (
    <>
    <Router>
    
    
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
        {state.auth && <><ResponsiveDrawer >
        <Switch>
          {routers.map(route => 
          <Route 
            key={route.name}
            path={route.path}
            exact={route.exact}
            component={route.component}
            />)}
        </Switch>
        </ResponsiveDrawer></>}
        <Redirect to="/auth" />
    </Router>
    </>
  );
}

export default App;
