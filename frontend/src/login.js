import React , { Component }  from 'react';
import auth0Client from './auth';
import { withRouter } from "react-router";


class Login extends Component {
  auth = auth0Client.isAuthenticated();
  render() {
  	console.log("Login page");
    console.log(this.props.location.pathname);
  	
  	return (
  		<div>
  	  <button className="btn" onClick={auth0Client.signIn}>Sign In</button>
  	  'Login page'
  	  {this.auth? 'authenticated' : 'not authenticated'}
  	  </div>
  	)
  }

}

export default withRouter(Login);