import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import logo from './logo.png';
import './App.css';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import List from './containers/List/List';
import Navigation from './components/Navigation/Navigation';
import TvDetails from './components/TV/TvDetails/TvDetails';
import TvForm from './components/TV/TvForm/TvForm';

import * as apiCalls from './api/api';
class App extends Component {

  state = {
    authLoading: false,
    isAuthenticated: true,
    userId: '',
    error: '',
    token: '',
    tvs: [],
  }

  async _loadTVs() {

    let tvs = await apiCalls.getTvs();

    this.setState({
      ...this.state,
      tvs
    });

  }

  addTv = async (tvData) => {

    const newTV = await apiCalls.createTv(tvData);

    this.setState({
      ...this.state,
      tvs: [
        ...this.state.tvs,
        newTV,
      ]
    });

  }

  deleteTv = (id, redirectCallback) => async () => {

    await apiCalls.removeTv(id);

    const newTvs = this.state.tvs.filter( tv => tv._id !== id );

    this.setState({
        tvs: newTvs,
    });

    redirectCallback();

  }

  loginHandler = loginCredentials => {

    this.setState({
      ...this.state,
      authLoading: true,
    });

    fetch('api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginCredentials)
    })
      .then( res => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          console.error('Error!');
          throw new Error('Could not authenticate!');
        }
        return res.json();
      })
      .then(({token, userId}) => {

        this.setState({
          ...this.state,
          token,
          userId,
          isAuthenticated: true,
          authLoading: false,
        });

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        const remainingMilliseconds = 60 * 60 * 1000;

        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );

        localStorage.setItem('expiryDate', expiryDate.toISOString());

        this._loadTVs();

        // TODO: implement
        // this.setAutoLogout(remainingMilliseconds);

      })
      .catch(err => {
        console.error(err);

        this.setState({
          ...this.state,
          isAuthenticated: false,
          authLoading: false,
          error: err
        });

      });
  };

  addUser = async (userDetails) => {

    let newlyAddedUser = await apiCalls.createUser(userDetails);

    console.log(newlyAddedUser);

  /*   const newState = {...this.state};
    newState.users.push(userDetails);

    this.setState(newState); */

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

          <Route
            path="/login"
            exact
            component={ () => <Login login={this.loginHandler} /> }
          />

          <Route path="/register" exact component={ () => <Register addUser={this.addUser} /> } />

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
              path="/televisions/new"
              render={ (props) => <TvForm addTv={this.addTv} /> }
              exact
            /> :
            <Redirect to="/login"/>
          }
          {
            this.state.isAuthenticated ?
            <Route
              path="/televisions/:id"
              render={ (props) => <TvDetails {...props} deleteTv={this.deleteTv} tvs={this.state.tvs} /> }
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
