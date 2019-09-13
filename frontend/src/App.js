import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import auth0Client from './auth';
import {Route, 
        BrowserRouter as Router,
         Redirect, withRouter} from 'react-router-dom';


import Login from './login';
import Dashboard from './dashboard';
import Callback from './callback';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        checkingSession: true,
      }
    }

    componentDidMount = async () => {
      if (this.props.location.pathname === '/callback') {
        this.setState({checkingSession:false});
        return;
      }
      try {
        let res = await auth0Client.silentAuth();
        console.log('finished silent auth');
        this.forceUpdate();
      } catch (err) {
        console.log('silentauth err');
        console.log(err.error);
        if (err.error !== 'login_required') console.log(err.error);
      }
      this.setState({checkingSession:false});
    }


    render() {
      return (
      <div>
        <Route exact path='/callback' component={Callback}/>
        <PrivateRoute path="/" component={Dashboard}
        checkingSession={this.state.checkingSession}/>
      </div>);
    }
    
  
}

function PrivateRoute(props) {
  const {component, path, checkingSession} = props;
  return (
    <Route
      path={path}
      render={() =>{
        if (checkingSession) return <h3 className="text-center">Validating session...</h3>;
        if (auth0Client.isAuthenticated()) {
          return <Dashboard />
        }
        else {
          console.log("Not Authenticated???");
          return <Login/>
        }

      }}
    />
  );
}


export default withRouter(App);



