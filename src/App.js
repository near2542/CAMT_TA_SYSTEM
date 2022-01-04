
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
import ResponsiveDrawer  from './pages/components/sidebar';
import ReturnToAuth from './pages/returnAuth';
function App() {
  return (
    <>
    <Router>
      <Route path='/' exact component={ReturnToAuth} />
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
    <ResponsiveDrawer >
        <Switch>
          {routers.map(route => 
          <Route 
            key={route.name}
            path={route.path}
            exact={route.exact}
            component={route.component}
            />)}
        <Redirect from="*" to="/auth"/>
        </Switch>
        </ResponsiveDrawer>
        
    </Router>
    </>
  );
}

export default App;
