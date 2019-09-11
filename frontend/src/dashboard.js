import React , { Component }  from 'react';
import axios from 'axios';
import BasicAppBar from './basicAppBar';
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
  render() {
    return (
      <div>
      <BasicAppBar/>
    "Main Dashboard"
    </div>
      )
     
  }

}

export default Dashboard;