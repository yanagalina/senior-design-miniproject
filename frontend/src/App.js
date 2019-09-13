import React from 'react';
import logo from './logo.svg';
import './App.css';
import auth0Client from './auth';
import {Route, 
        BrowserRouter as Router,
         Redirect, withRouter} from 'react-router-dom';


import Login from './login';
import Dashboard from './dashboard';
import Callback from './callback';

function App(props) {
    console.log("Main app");
    console.log("Authenticated? " + auth0Client.isAuthenticated());
    var isAuthenticated = auth0Client.isAuthenticated();
    console.log(window.location.href);
    return (
    <div>
      <Router>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/callback' component={Callback}/>
      <PrivateRoute path="/" component={Dashboard}/>
      
      </Router>
    </div>
    
    );
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth0Client.isAuthenticated() ? (
          <Dashboard {...props} />
        ) : (
           <Redirect from="/" exact to="/login" />
        
        )
      }
    />
  );
}


export default App;



