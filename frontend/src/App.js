import React, {Suspense} from 'react';
import logo from './logo.svg';
import './App.css';


const Login = React.lazy(() => import('./login'));
const Dashboard = React.lazy(() => import('./dashboard'));

function App() {
    //const user = useUser()
    //return user ? <AuthenticatedApp /> : <Login />

    return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard/>
    </Suspense>);
}

export default App;
