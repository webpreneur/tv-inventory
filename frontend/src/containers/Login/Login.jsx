import React from 'react';
import { withRouter } from 'react-router-dom';
class Login extends React.Component {

  state = {
    email: "",
    password: ""
  }

  componentDidMount() {
    document.addEventListener("keydown", this._handleEnterPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleEnterPress);
  }

  _handleEnterPress = event => {
    if ( event.key === 'Enter' ) {
      event.preventDefault();
      this._handleLogin(event);
    }
  }

  _handleLogin = event => {

    event.preventDefault();

    this.props.login(
      {
      ...this.state
      },
      this.redirectToList
    );

  }

  _handleChange = key => ({
    target: {
      value
    }
  }) => this.setState({
    ...this.state,
    [key]: value,
  })

  redirectToList = () => {
    this.props.history.push({pathname: '/televisions'});
  }

  render() {

    return (
      <>
        <h1>
          Login
        </h1>

        <div className="login-form">

              <form onSubmit={this._handleLogin}>
                <input
                  type="email"
                  value={this.state.email}
                  placeholder="e-mail address"
                  onChange={this._handleChange('email')}
                >
                </input>

                <input
                  type="password"
                  value={this.state.password}
                  placeholder="password"
                  onChange={this._handleChange('password')}
                >
                </input>

                <button className="login-btn" type="submit">Login</button>
              </form>

        </div>
      </>
    )
  }
}

export default withRouter(Login);
