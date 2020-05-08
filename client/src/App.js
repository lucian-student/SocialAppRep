import React from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import {Container} from 'semantic-ui-react';

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
//import { AuthContext } from './context/auth';


//note page needs to be at bottom otherwise it colapses
function App() {
  return (
    <AuthProvider>
      <div class="ui container">
        <Router>
          <MenuBar />
          <Switch>
           <Route exact path='/social' component={Social} /> 
            <AuthRoute exact path='/' component={Login} />
            <Route exact path='/home' component={Home} />
            <AuthRoute exact path='/register' component={Register} />
            <Route exact path='/groups/:groupId' component={GroupPage} />
            <Route exact path='/:noteId' component={NotePage} />
           
          </Switch>
        </Router>
      </div>
    </AuthProvider>


  );
}

export default App;
