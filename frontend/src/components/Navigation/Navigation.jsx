import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class Navigation extends Component {

state = {
  pathname: "/",
}

clickHandler = (pathname) => {
  this.setState({pathname});
}

  render() {

    let signedInOptions = null;

    if (this.state.pathname !== "/") {
      signedInOptions = (
        <>
          <li><NavLink onClick={ () => {this.clickHandler("televisions")}} to="/televisions">List</NavLink></li>
          <li><NavLink onClick={ () => {this.clickHandler("new")}} to="/new">Add new one</NavLink></li>
          <li><NavLink onClick={ () => {this.props.handleLogout(false)}} to="/logout">Logout</NavLink></li>
        </>
      )
    }

    return(
      <nav className='Navigation'>
        <ul >
          <li><NavLink onClick={ () => {this.clickHandler("/")}} to="/" exact >Home</NavLink></li>
          <li><NavLink onClick={ () => {this.clickHandler("login")}} to="/login">Login</NavLink></li>
          <li><NavLink onClick={ () => {this.clickHandler("register")}} to="/register">Register</NavLink></li>

          { signedInOptions }

        </ul>
      </nav>
    )
  }
}

export default withRouter(Navigation);

