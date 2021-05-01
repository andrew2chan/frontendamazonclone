import React from "react";
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "@fontsource/roboto";
import { Redirect } from 'react-router-dom';

import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default class MyNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.navbarController = this.navbarController.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(e) {
    let val = e.target.value;

    this.props.updatesearchbar(val);
  }

  navbarController() {
    if(this.props.logged) {
      return (
        <>
          <div>
            <NavLink to="/profile">Profile</NavLink>
          </div>
          <div>
            <NavLink to="/addproduct">Add/Remove a product</NavLink>
          </div>
          <div>
            <NavLink to="/cart">Cart<FontAwesomeIcon icon={faShoppingCart} /></NavLink>
          </div>
          <div>
            <NavLink to="/logout">Logout</NavLink>
          </div>
        </>
      )
    }
    else {
      return (
        <>
          <div>
            <NavLink to="/register">Sign up</NavLink>
          </div>
          <div>
            <NavLink to="/login">Login</NavLink>
          </div>
        </>
      )
    }
  }

  render() {
    return (
      <nav>
        <div>
          <NavLink to="/">E-Commerce Logo</NavLink>
        </div>
        <div id="searchBarContainer">
          {this.props.showsearchbar ? <input type="text" onChange={this.updateSearch}></input> : <span></span>}
        </div>
        {this.navbarController()}
      </nav>
    )
  }
}
