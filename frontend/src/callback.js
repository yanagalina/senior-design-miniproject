import React, {Component} from 'react';
import auth0Client from './auth';
import axios from 'axios';
import { withRouter } from "react-router";


class Callback extends Component {
  componentDidMount = async () => {
    try {
      let res = await auth0Client.handleAuthentication();
      console.log(auth0Client.getIdToken());
      let res2 = await axios.post('http://localhost:2000/api/user', {},
        {
         headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        });
      this.props.history.replace('/');
    }
    catch(err) {
      console.error(err);
    }
  }



  render() {
    console.log(window.location.href);
    return (
      <p>Loading profile...</p>
    );
  }
}

export default withRouter(Callback);