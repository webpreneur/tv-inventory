import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import logo from './logo.png';
import './App.css';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import List from './containers/List/List';
import Navigation from './components/Navigation/Navigation';
import users from './db/users';
import apiUrls from './api/api-urls';
import TvDetails from './components/TV/TvDetails/TvDetails';

class App extends Component {

  state = {
    users,
    tvs: [],
    isAuthenticated: true,
  }

  componentWillMount() {
    this.loadTVs();
  }

  loadTVs() {
    fetch(apiUrls.tvApi)
      .then( response => {
        if(!response.ok) {
          if ( response.status >= 400 && response.status < 500 ) {
            return response.json()
              .then(data => {
                let err = {errorMessage: data.message};
                throw err;
              })
          } else {
            let err = {errorMessage: 'please try again later, server is not responding'};
            throw err;
          }
        }
        return response.json();
      })
      .then( tvs => {
        this.setState({
          ...this.state,
          tvs
        });
      });
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

          {
            this.state.isAuthenticated ?
            <Route
              path="/televisions"
              exact
              component={ () => <List Televisions={this.state.tvs} /> }
            /> :
            <Redirect to="/login"/>
          }
          {
            this.state.isAuthenticated ?
            <Route
              path="/televisions/:id"
              render={ (props) => <TvDetails {...props} /> }
              exact
            /> :
            <Redirect to="/login"/>
          }

        </Switch>

        </div>
      </BrowserRouter>

    );
  }
}

export default App;
