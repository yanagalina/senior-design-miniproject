import React , { Component }  from 'react';
import axios from 'axios';
import BasicAppBar from './basicAppBar';
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';
import auth0Client from './auth';



class Dashboard extends Component {
	state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  helloWorld = async () => {
    try {
    var res = await axios.get('http://localhost:2000/api/hello', 
      {
       headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
      });
    }
    catch(err) {
      console.log(err);
    }
    console.log(res);
  }

  render() {
    console.log("Dashboard");
    return (
      <div>
      <BasicAppBar/>
    "Main Dashboard"
    <Button color="inherit" onClick={this.helloWorld}>HelloWorld</Button>
    </div>
      )
     
  }

}

export default withRouter(Dashboard);