import React from 'react';

class Login extends React.Component {
  state = {
    loginData: {
      email: "",
      password: ""
    },
  }


  handleLogin = (event) => {
    event.preventDefault();
    let isAuth = false;


    this.props.users.forEach((user) => {
      if (user.email === this.state.loginData.email) {
        
        if (user.password === this.state.loginData.password) {
          isAuth = true;
        }
      }
    });
    
    this.props.loginStatus(isAuth);
  }

  handleEmailChange = (event) => {
    const newState = {...this.state};
    newState.loginData.email = event.target.value;
    this.setState(newState);
  }

  handlePasswordChange = (event) => {
    const newState = {...this.state};
    newState.loginData.password = event.target.value;
    this.setState(newState);
  }
  
  render() {

    return (
      <>
        <h1>
          Login
        </h1>
        <div className="login-form">
              <form onSubmit={this.handleLogin}>
                <input type="email" value={this.state.loginData.email} placeholder="e-mail address" onChange={this.handleEmailChange}></input>
              
                <input type="password" value={this.state.loginData.password} placeholder="password" onChange={this.handlePasswordChange}></input>

                <button className="login-btn" type="submit">Login</button>
              </form>
        </div>
      </>
    )
  }
}


export default Login;
