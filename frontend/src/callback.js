import React, {Component} from 'react';
import auth0Client from './auth';
import { withRouter } from "react-router";


class Callback extends Component {
  async componentDidMount() {
  	try {
  		console.log("handling authentication");
    console.log(window.location.href);

  		console.log(window.location.hash);
  		var res = await auth0Client.handleAuthentication();
  	}
  	catch (err)
  	{
  		console.error(err);
  	}
    
    this.props.history.replace('/');
  }

  render() {
  	console.log("callback page");
  	console.log("Authenticated? " + auth0Client.isAuthenticated());
    console.log(window.location.href);

    return (
      <p>Loading profile...</p>
    );
  }
}

export default withRouter(Callback);