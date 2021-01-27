import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AdminPanel from "./Admin/AdminPanel";
import Login from "./auth/login";
import Signup from "./auth/Signup";
import User from "./User/User";
import UserDragDrop from './User/Userdragdrop';
import './App.css';
class Routes extends Component {
  state = {
    authToken: localStorage.getItem('jwtToken') ? localStorage.getItem('jwtToken') : null,
    loginToken: localStorage.getItem('loginToken') ? localStorage.getItem('loginToken') : null
  }
  // const loggedin=localStorage.getItem('jwtToken');
  // this.setState({loggedIn:loggedin});
  // componentDidMount() {
  //   console.log("routes", this.props)
  // }
  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" render={(props) => {
              return <Login {...props} />;
            }}
            />
            <Route
              exact path="/AdminPanel"
              render={(props) => {
                if (this.state.authToken !== null && this.state.loginToken)
                  return <AdminPanel {...props} />;
                else return <Redirect to="/" />;
              }}
            />
            <Route exact path="/Signup" component={Signup} />
            <Route exact path="/AdminPanel" component={AdminPanel} />
            <Route exact path="/User"
              render={(props) => {
                if (this.state.authToken !== null && this.state.loginToken)
                  return <User {...props} />;
                else return <Redirect to="/" />;
              }} />
            <Route exact path="/UserDragDrop"
              render={(props) => {
                if (this.state.authToken !== null && this.state.loginToken)
                  return <UserDragDrop {...props} />;
                else return <Redirect to="/" />;
              }} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default Routes;
