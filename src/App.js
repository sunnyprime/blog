import React, {Fragment,useEffect} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// Redux
import { Provider } from 'react-redux';
import store from "./store"
import Alert from './components/layout/Alert';
import {loadUser} from "./actions/auth"
import setAuthToken from "./utils/setAuthToken"

if (localStorage.token) {
  // console.log("india");  
  // console.log(localStorage.token);  
  setAuthToken(localStorage.token)
}


function App() {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return (
    <Provider store={store}>
   <Router>
   <Fragment>
      <Navbar></Navbar>
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert />
        <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/Login" component={Login} />
        </Switch>
      </section>
   </Fragment>
   </Router>   
   </Provider>
  );
}

export default App;
