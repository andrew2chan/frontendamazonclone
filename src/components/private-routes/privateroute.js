import React from "react";
import ReactDOM from "react-dom";
import { Redirect, Route } from 'react-router-dom';

import Cart from './cart.js';
import Profile from './profile.js'
import AddProduct from './addproduct.js'

export default class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.isLogged = this.isLogged.bind(this);
  }

  isLogged() {
    if(this.props.isLogged == false) {
      return <Redirect to="/login" />
    }
    else {
      return (
        <>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/profile">
            <Profile {...this.props} updatecurrentuser={this.props.updatecurrentuser} />
          </Route>
          <Route path="/addproduct">
            <AddProduct {...this.props} />
          </Route>
        </>
      )
    }
  }

  render() {
    return (
      <>
        {this.isLogged()}
      </>
    )
  }
}
