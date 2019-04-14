import React, { Component } from 'react';

export default class Register extends Component {

  state = {
    email: "",
    password: "",
  }

  handleChange = key => ({
    target: {
      value
    }
  }) => {
    this.setState({
      ...this.state,
      [key]: value,
    });
  }

  handleSubmit = e => {

    this.props.addUser({
      ...this.state,
    });

  }

  render() {
    return (
      <>
        <h1>
          Register
        </h1>
        <div className="register-form">

          <input
            type="email"
            value={this.state.email}
            placeholder="e-mail address"
            onChange={this.handleChange('email')} >
          </input>

          <input
            type="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.handleChange('password')}>
          </input>

          <button className="login-btn" onClick={this.handleSubmit} >Register</button>

        </div>
      </>
    );
  }
}
