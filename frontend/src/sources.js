import axios from 'axios';
import React, {Component} from 'react';
import auth0Client from './auth';

class Sources extends Component {
   constructor(props) {
      super(props);
      this.state = {
        loading: true,
        sources: [],
      }
    }

  componentDidMount = async () => {
  	this.setState({loading: true});
  	try {
    var res = await axios.get('http://localhost:2000/api/sources', 
      {
       headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
      });
    this.setState({loading: false, sources: res.data});
    }
    catch(err) {
      console.log(err);
    }
    
  }

  render() {
  	return(
  		this.state.loading ? <p>Loading...</p> :
  		<div>
  		  {this.state.sources && this.state.sources.map((source, index) => (
          <p>Name: {source.name} Type: {source.type} </p>
          ))}
  		</div>
  	)
  }

}

export default Sources;