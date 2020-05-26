import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import NotePage from './pages/NotePage';
import Social from './pages/Social';
import GroupPage from './pages/GroupPage';
import CheckAuthRoute from './util/CheckAuthRoute';
import { AuthContext } from './context/auth';




function App() {
  
  return (
    <AuthProvider>

      <div classname='ui container'>
        <Router>
          <MenuBar />
          <Switch>
            <CheckAuthRoute exact path='/social' component={Social} />
            <AuthRoute exact path='/' component={Login} />
            <CheckAuthRoute exact path='/home' component={Home} />
            <AuthRoute exact path='/register' component={Register} />
            <CheckAuthRoute exact path='/groups/:groupId' component={GroupPage} />
            <CheckAuthRoute exact path='/:noteId' component={NotePage} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>


  );
}



export default App;
