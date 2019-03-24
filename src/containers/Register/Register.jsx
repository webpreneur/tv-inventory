import React, { Component } from 'react';


class Register extends Component {

  state = {
    newUserData: {
      email: "",
      password: "",
    }
  }

  

  handleEmailChange = (event) => {
    const newState = {...this.state};
    newState.newUserData.email = event.target.value;
    this.setState(newState);
  }

  handlePasswordChange = (event) => {
    const newState = {...this.state};
    newState.newUserData.password = event.target.value;
    this.setState(newState);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const newUserDetails = {
      email: this.state.newUserData.email,
      password: this.state.newUserData.password
    }; 
    this.props.addUser(newUserDetails);
  }



  render() {
    return (
      <>
        <h1>
          Register
        </h1>
        <div className="register-form">
              <form onSubmit={this.handleSubmit} >
                <input type="email" value={this.state.newUserData.email} placeholder="e-mail address" onChange={this.handleEmailChange} ></input>
              
                <input type="password" value={this.state.newUserData.password} placeholder="password" onChange={this.handlePasswordChange}></input>
  
                <button className="login-btn" type="submit" >Register</button>
              </form>
        </div>
      </>
    );
  }
}


export default Register;