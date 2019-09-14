import React, {Component} from 'react';
import auth0Client from './auth';
import axios from 'axios';
import { withRouter } from "react-router";


class Callback extends Component {
  componentDidMount = async () => {
    let res = await auth0Client.handleAuthentication();
    let res2 = await axios.post('localhost:2000/api/user', 
      {
       headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
      });
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