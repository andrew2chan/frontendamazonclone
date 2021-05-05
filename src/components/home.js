import React from "react";
import ReactDOM from "react-dom";
import {fetchURL} from "../constants.js";
import {fetchWithBody, fetchGet} from "../helperFunctions.js";

import '../../stylesheet/home.scss'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToLoad: null
    };
    this.displayItems = this.displayItems.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleAddCart = this.handleAddCart.bind(this);
    this.fetchPostToCart = this.fetchPostToCart.bind(this);
  }

  componentWillUnmount() {
    this.props.showsearchbar(false);
  }

  async fetchProducts() {
    return await fetchGet(fetchURL + "/api/Products");
  }

  componentDidMount() {
    this.fetchProducts().then((response) => {
      this.setState({
        dataToLoad: response
      });

      this.props.showsearchbar(true);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleAddCart(e) {
    let childNodes = e.target.parentNode.childNodes;
    let parentId = childNodes[3].id.split("productid")[1];

    let newProduct = {
      ProductName: childNodes[0].innerHTML, //name
      ProductPrice: childNodes[1].innerHTML.slice(1), //price
      ProductDescription: childNodes[2].innerHTML, //description
      ParentProductId: parentId, //id of the parent item
      CartId : localStorage.getItem("loggedInId")
    };

    this.fetchPostToCart(newProduct)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  async fetchPostToCart(newProduct) {
    return await fetchWithBody(fetchURL + "/api/Cart", "POST", newProduct);
  }

  displayItems() {
    if(this.state.dataToLoad) {
      return (
        <>
        {
          this.state.dataToLoad.map((product, i) => {
            if(product.productName.indexOf(this.props.searchbar) != -1 && product.userId != localStorage.getItem("loggedInId") ) { //filter && not your own product
              return (
                <div className="productContainer" key={i}>
                  <div className="productInnerContainer">
                    <div className="productName">{product.productName}</div>
                    <div className="productPrice">${product.productPrice}</div>
                    <div className="productDescription">{product.productDescription}</div>
                    {this.props.logged ? <input type="button" onClick={this.handleAddCart} id={"productid"+product.productsId} value="Add to cart"></input> : <div></div>}
                  </div>
                </div>
              ) //end return
            }
          }) //end map
        }
        </>
      )
    }
    else {
      return "There is currently no products available"
    }
  }

  render() {
    return(
      <div className="mainContainer">
        {this.displayItems()}
      </div>
    )
  }
}
