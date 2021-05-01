import React from "react";
import ReactDOM from "react-dom";
import {fetchURL} from '../constants.js';
import { Redirect } from 'react-router-dom';
import {fetchWithBody} from "../helperFunctions.js";

import '../../stylesheet/login_register.scss'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formStateMessage: "",
      name: "",
      email: "",
      address: "",
      password: ""
    };

    this.fetchPostData = this.fetchPostData.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetchPostData() {
    let sendBody = {"Name": this.state.name, "Email": this.state.email, "Address": this.state.address, "Password": this.state.password};
    /*const sentDataResult = await fetch(fetchURL+'/api/Users/login', {
      method: 'POST',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({"Name": this.state.name, "Email": this.state.email, "Address": this.state.address, "Password": this.state.password})
    })

    const returnPromise = await sentDataResult.json();

    return returnPromise;*/

    return await fetchWithBody(fetchURL+'/api/Users/login', "POST", sendBody);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.fetchPostData().then((response) => {
      this.setState({ formStateMessage: response.message });

      if(response.status == "ok") {
        this.props.updatecurrentuser(response.id, response.name, response.email, response.address, response.password, true); //id, email, address, password, loggedin
        localStorage.setItem("jwtToken", response.token);
        localStorage.setItem("loggedInId", response.id);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    if(this.state.formStateMessage === undefined) {
      return <Redirect to="/" /> //redirect if no response message is set
    }

    return(
      <div className="login-register-container">
        <div className="login-register-inner-container">
          <div>
            <h1>Sign in</h1>
          </div>
          <form onSubmit={this.handleSubmit} name="myForm">
            <div>
              <label>
                <span>Email</span>
                <input type="text" name="Email" onChange={this.handleEmail}></input>
              </label>
            </div>
            <div>
              <label>
                <span>Password</span>
                <input type="password" name="Password" onChange={this.handlePassword}></input>
              </label>
            </div>
            <input type="submit" value="Login"></input>
          </form>
          <div id="formStateMessage">{this.state.formStateMessage}</div>
        </div>
      </div>
    )
  }
}
