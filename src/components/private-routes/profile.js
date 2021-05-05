import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import {fetchURL} from '../../constants.js';
import {fetchWithBody} from "../../helperFunctions.js";

import '../../../stylesheet/profile.scss';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formStateMessage: "",
      name: "",
      email: "",
      address: "",
      password: "",
      accountDeleted: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchPutData = this.fetchPutData.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.fetchDeleteData = this.fetchDeleteData.bind(this);
  }

  componentDidMount() {
    this.setState({
      "name": this.props.name,
      "email": this.props.email,
      "address": this.props.address
    })
  }

  async fetchPutData() {
    let id = localStorage.getItem("loggedInId");
    let sendBody = {"id": localStorage.getItem("loggedInId"), "Name": this.state.name, "Email": this.state.email, "Address": this.state.address, "Password": this.state.password};

    return await fetchWithBody(fetchURL + "/api/Users/"+ id, "PUT", sendBody);
  }

  async fetchDeleteData() {
    let id = localStorage.getItem("loggedInId");
    let sendBody = {"id": localStorage.getItem("loggedInId"), "Name": this.state.name, "Email": this.state.email, "Address": this.state.address, "Password": this.state.password};

    return await fetchWithBody(fetchURL + "/api/Users/" + id, "DELETE", sendBody);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.fetchPutData()
    .then((response) => {
      this.setState({ formStateMessage: response.message });
      this.props.updatecurrentuser(this.props.id, this.state.name, this.props.email, this.state.address, this.props.password, true);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  deleteAccount() {
    let deletePrompt = confirm("Are you sure you want to to delete this account?");

    if(deletePrompt) {
      this.fetchDeleteData()
      .then((response) => {
        this.setState({
          accountDeleted: true
        });
        this.props.updatecurrentuser("","","","","",false);
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  handleName(e) {
    this.setState({ name: e.target.value });
  }

  handleAddress(e) {
    this.setState({ address: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    if(this.state.accountDeleted) {
      <Redirect to="/" />
    }

    return(
      <div className="profile-container">
        <div className="profile-inner-container">
          <div>
            <h1>Contact information</h1>
          </div>
          <form onSubmit={this.handleSubmit} name="myForm">
            <div>
              <label>
                <span>Name</span>
                <input type="text" name="Name" onChange={this.handleName} defaultValue={this.props.name}></input>
              </label>
            </div>
            <div>
              <label>
                <span>Email</span>
                <input type="text" name="Email" defaultValue={this.props.email} readOnly disabled></input>
              </label>
            </div>
            <div>
              <label>
                <span>Address</span>
                <input type="text" name="Address" onChange={this.handleAddress} defaultValue={this.props.address}></input>
              </label>
            </div>
            <div>
              <label>
                <span>Password</span>
                <input type="password" name="Password" onChange={this.handlePassword}></input>
              </label>
            </div>
            <input type="submit" value="Update information"></input>
          </form>
          <input type="button" value="Delete account" onClick={this.deleteAccount}></input>
          <div id="formStateMessage">{this.state.formStateMessage}</div>
        </div>
      </div>
    )
  }
}
