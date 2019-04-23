import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class Navigation extends Component {

  render() {

    return(
      <nav className='Navigation'>
        <ul >
          <li><NavLink to="/" exact >Home</NavLink></li>
          {
            this.props.isAuthenticated ?
              <>
                <li><NavLink to="/televisions" exact>List</NavLink></li>
                <li><NavLink to="/televisions/new" exact>Add new one</NavLink></li>
                <li><NavLink onClick={ () => {this.props.handleLogout(false)}} to="/logout">Logout</NavLink></li>
              </> :
              <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
              </>
          }
        </ul>
      </nav>
    )
  }
}

export default withRouter(Navigation);

