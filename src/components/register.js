import React from "react";
import ReactDOM from "react-dom";
import {ValidateInputs} from "../services/validations.js"
import { Redirect } from 'react-router-dom';
import {fetchURL} from '../constants.js'
import {fetchWithBody} from "../helperFunctions.js";

import '../../stylesheet/login_register.scss'

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formStateMessage: "",
      name: "",
      email: "",
      address: "",
      password: "",
      successfulRegistration: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchPostData = this.fetchPostData.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  async fetchPostData() {
    let sendBody = {"Name": this.state.name, "Email": this.state.email, "Address": this.state.address, "Password": this.state.password};

    return await fetchWithBody(fetchURL+'/api/Users', "POST", sendBody);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.fetchPostData().then((response) => {
      this.setState({ formStateMessage: response.message });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleName(e) {
    this.setState({ name: e.target.value });
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleAddress(e) {
    this.setState({ address: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    if(this.state.formStateMessage === undefined) {
      return <Redirect to="/login" /> //redirect if no response message is set
    }

    if(this.props.logged) {
      return <Redirect to="/profile" />
    }

    return(
      <div className="login-register-container">
        <div className="login-register-inner-container">
          <div>
            <h1>Create an account</h1>
          </div>
          <form onSubmit={this.handleSubmit} name="myForm">
            <div>
              <label>
                <span>Name</span>
                <input type="text" name="Name" onChange={this.handleName}></input>
              </label>
            </div>
            <div>
              <label>
                <span>Email</span>
                <input type="text" name="Email" onChange={this.handleEmail}></input>
              </label>
            </div>
            <div>
              <label>
                <span>Address</span>
                <input type="text" name="Address" onChange={this.handleAddress}></input>
              </label>
            </div>
            <div>
              <label>
                <span>Password</span>
                <input type="password" name="Password" onChange={this.handlePassword}></input>
              </label>
            </div>
            <input type="submit" value="Create your account"></input>
          </form>
          <div id="formStateMessage">{this.state.formStateMessage}</div>
        </div>
      </div>
    )
  }
}
