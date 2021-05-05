import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {fetchURL, initialFetchStatus} from './constants.js'
import {fetchWithBody, fetchGet} from "./helperFunctions.js";

import Register from './components/register.js';
import Login from './components/login.js';
import Logout from './components/logout.js';
import Home from './components/home.js';
import MyNavBar from './components/navbar/navbar.js';
import PrivateRoute from './components/private-routes/privateroute.js'

import '../stylesheet/index.scss'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      address: "",
      password: "",
      isLogged: null,
      searchBar: "",
      showSearchBar: false
    };
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.fetchInitialState = this.fetchInitialState.bind(this);
    this.updateSearchBar = this.updateSearchBar.bind(this);
    this.updateShowSearchBar = this.updateShowSearchBar.bind(this);
  }

  componentDidMount() { //set initial state
    if(localStorage.getItem("loggedInId") != null) {
      this.fetchInitialState().then((response) => {
          this.setState({
            id: response.id,
            name: response.name,
            email: response.email,
            address: response.address,
            isLogged: true
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      this.setState({
        isLogged: false
      });
    }
  }

  async fetchInitialState() {
    //let bearer = "Bearer " + localStorage.getItem("jwtToken");
    let id = localStorage.getItem("loggedInId");
    let body = {
      "Id": localStorage.getItem("loggedInId"),
      "Name": "",
      "Email": "",
      "Address": ""
    };

    /*const fetchedData = await fetch(fetchURL+"/api/Users/"+localStorage.getItem("loggedInId"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": bearer
      },
      body: JSON.stringify(body)
    })

    const returnedPromised = await fetchedData.json();

    return returnedPromised;*/

    return await fetchWithBody(fetchURL + "/api/Users/" + id, "POST", body);
  }

  //callback that is passed down to login to save data
  updateCurrentUser(currId, currName, currEmail, currAddress, currPassword, logged) {
    this.setState({
      id: currId,
      name: currName,
      email: currEmail,
      address: currAddress,
      password: currPassword,
      isLogged: logged
    });
  }

  updateShowSearchBar(toggleShow) {
    this.setState({
      showSearchBar: toggleShow
    })
  }

  updateSearchBar(itemToSearch) {
    this.setState({
      searchBar: itemToSearch
    });
  }

  render() {
    return(
      <BrowserRouter>
        <MyNavBar logged={this.state.isLogged} updatesearchbar={this.updateSearchBar} showsearchbar={this.state.showSearchBar} />

        <Switch>
          <Route exact path="/">
            <Home searchbar={this.state.searchBar} logged={this.state.isLogged} showsearchbar={this.updateShowSearchBar} />
          </Route>
          <Route path="/logout">
            <Logout updatecurrentuser={this.updateCurrentUser}/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login updatecurrentuser={this.updateCurrentUser} />
          </Route>
          <PrivateRoute {...this.state} updatecurrentuser={this.updateCurrentUser}></PrivateRoute>
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById("root")
)
