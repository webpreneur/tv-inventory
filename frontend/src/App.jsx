import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import logo from './logo.png';
import './App.css';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import List from './containers/List/List';
import Navigation from './components/Navigation/Navigation';
import users from './db/users';
import TvDetails from './components/TV/TvDetails/TvDetails';
import TvForm from './components/TV/TvForm/TvForm';

import * as apiCalls from './api/api';
class App extends Component {

  state = {
    users,
    tvs: [],
    isAuthenticated: true,
  }

  componentWillMount() {
    this._loadTVs();
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

  changeAuthStatus = (isAuthenticated) => {

    this.setState({
      ...this.state,
      isAuthenticated
    });

  }

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
          <Route path="/login" exact component={ () => <Login loginStatus={this.changeAuthStatus} users={this.state.users} /> } />
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
