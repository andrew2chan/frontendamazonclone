import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from 'react-router-dom';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.logout();
  }

  logout() {
    this.props.updatecurrentuser("","","","","",false);
    localStorage.clear();
  }

  render() {
    return(
      <>
        <Redirect to="/" />
      </>
    )
  }
}
