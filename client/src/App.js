import React, { useContext, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

//import { fire, fireAnalitycs } from './configuration/fire';
import { AuthContext } from './context/auth';




//note page needs to be at bottom otherwise it colapses

/*class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user : {}
    }
  }
  componentDidMount(){
    this.authListener();
  }

  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({user})
      }
      else{
        this.state({user:null});
      }
    });
  }*/
function App() {
  const { user } = useContext(AuthContext);



  return (
    <AuthProvider>

      <div classname='ui container'>
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
