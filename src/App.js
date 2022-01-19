
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { routers } from './shared/router'
import { Login } from './pages/login';
import { Register } from './pages/register';
import ResponsiveDrawer from './pages/components/sidebar';
import ReturnToAuth from './pages/returnAuth';
import ProtectedRoute from './pages/components/ProtectedRoute'
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
        <ProtectedRoute>
          <ResponsiveDrawer>
            <Switch>
              {routers.map(route =>
                <Route
                  key={route.name}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />)}
            
            </Switch>
          </ResponsiveDrawer>
        </ProtectedRoute>
      </Router>
    </>
  );
}

export default App;
