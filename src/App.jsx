import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import logo from './logo.png';
import './App.css';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import List from './containers/List/List';
import TV from './components/TV/TV';
import Navigation from './components/Navigation/Navigation';
import users from './db/users';

class App extends Component {
  state = {
    users,
    isAuthenticated: false,
  }

  changeAuthStatus = (isAuthenticated) => {

    this.setState({
      ...this.state,
      isAuthenticated
    });

  }

  handleNewUserCreation = (userDetails) => {

    const newState = {...this.state};
    newState.users.push(userDetails);

    this.setState(newState);

  }

  render() {
    return (
      <BrowserRouter>

        <div className="App">
          <Navigation handleLogout={this.changeAuthStatus} />

          <header className="App-header">
            { window.location.pathname !== 'list' ? <img src={logo} className="App-logo" alt="logo" /> : null}
          </header>

        <Switch>
          <Route path="/login" exact component={ () => <Login loginStatus={this.changeAuthStatus} users={this.state.users} /> } />
          <Route path="/register" exact component={ () => <Register addUser={this.handleNewUserCreation} /> } />
          { this.state.isAuthenticated ? <Route path="/list" exact component={List} /> : <Redirect to="/login"/> }
          { this.state.isAuthenticated ? <Route path="/televisions/:id" exact component={TV} /> : <Redirect to="/login"/> }

        </Switch>

        </div>
      </BrowserRouter>

    );
  }
}

export default App;
