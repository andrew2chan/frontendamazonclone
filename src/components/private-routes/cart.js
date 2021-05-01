import React from "react";
import ReactDOM from "react-dom";
import {fetchURL} from "../../constants.js";
import {fetchWithBody} from "../../helperFunctions.js";

import '../../../stylesheet/cart.scss'

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToLoad: [],
      total: 0
    };
    this.getInitialCart = this.getInitialCart.bind(this);
    this.fetchInitialData = this.fetchInitialData.bind(this);
    this.displayCart = this.displayCart.bind(this);
    this.totalPrice = this.totalPrice.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.fetchDelete = this.fetchDelete.bind(this);
  }

  componentDidMount() {
    this.getInitialCart();
  }

  async fetchInitialData() {
    let id = localStorage.getItem("loggedInId");
    let cartToLookFor = { "CheckId": id };

    return await fetchWithBody(fetchURL + "/api/Cart/" + id, "POST", cartToLookFor);
  }

  totalPrice(accumulator, currentVal) {
    return accumulator + currentVal.productPrice;
  }

  getInitialCart() {
    this.fetchInitialData()
    .then((response) => {
      console.log(response);
      let sumTotal = response[0].cartProduct.reduce(this.totalPrice, 0);

      this.setState({
        dataToLoad: response,
        total: sumTotal
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  updateCart(e) {
    let removeItemId = e.target.id.split("removeProduct")[1];

    this.fetchDelete(removeItemId)
    .then((response) => {
      //console.log(this.state.dataToLoad[0].cartProduct)
      let cart = this.state.dataToLoad[0].cartProduct;

      for(let i = 0; i < cart.length; i++) {
        let id = this.state.dataToLoad[0].cartProduct[i].productsId;

        if(id == removeItemId) {
          let newStateDataToLoad = this.state.dataToLoad;
          newStateDataToLoad[0].cartProduct.splice(i, 1);
          let sumTotal = this.state.dataToLoad[0].cartProduct.reduce(this.totalPrice, 0);

          this.setState({
            dataToLoad: newStateDataToLoad,
            total: sumTotal
          });
        } //end if
      } //end loop
    })
    .catch((err) => {
      console.log(err);
    })
  }

  async fetchDelete(productId) {
    let ProductToLookFor = { "CheckId": productId };

    return await fetchWithBody(fetchURL + "/api/Cart", "DELETE", ProductToLookFor);
  }

  displayCart() {
    if(this.state.total > 0) {
      return (
        <>
          {
            this.state.dataToLoad[0].cartProduct.map((product, i) => {
              return (
                <div className="cartContainer" key={i}>
                  <div className="cartInnerContainer">
                    <div>Product: {product.productName}</div>
                    <div>Product price: ${product.productPrice}</div>
                    <input type="hidden" id="prodId" name="prodId" value={product.productsId}></input>
                    <input type="button" id={"removeProduct"+product.productsId} value="Remove from cart" onClick={this.updateCart}></input>
                  </div>
                </div>
              ) //end return
            }) //end map
          }
          <h1>Total: ${this.state.total}</h1>
        </>
      )
    }
    else {
      return <div>There is nothing in the cart</div>
    }

  }

  render() {
    return(
      <div className="cart">
        {this.displayCart()}
      </div>
    )
  }
}
