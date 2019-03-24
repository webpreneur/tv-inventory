import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import logo from './logo.png';
import './App.css';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import List from './containers/List/List';
import TV from './components/TV/TV';
import Navigation from './components/Navigation/Navigation';
import Users from './db/users';




class App extends Component {
  state = {
    isAuthenticated: false,
    felhasznalok: Users
  }

  changeAuthStatus = (isAuthenticated) => {
    this.setState({isAuthenticated: isAuthenticated});
    
  }

  handleNewUserCreation = (userDetails) => {
    const newState = {...this.state};
    newState.felhasznalok.push(userDetails);
    this.setState(newState);
  }

  render() {
    return (
      <BrowserRouter>

        <div className="App">
          <Navigation/>

          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            
          </header>

        <Switch>
          <Route path="/login" exact component={() => <Login loginStatus={this.changeAuthStatus} users={this.state.felhasznalok} /> } />
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
