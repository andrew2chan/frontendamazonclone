import React from "react";
import ReactDOM from "react-dom";
import { fetchURL } from '../../constants.js';
import {fetchWithBody} from "../../helperFunctions.js";

import '../../../stylesheet/addproduct.scss';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formStateMessage: "",
      productName: "",
      productDescription: "",
      productPrice: 0.00,
      dataToLoad: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProductName = this.handleProductName.bind(this);
    this.handleProductDescription = this.handleProductDescription.bind(this);
    this.handleProductPrice = this.handleProductPrice.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  async fetchProducts() {
    let id = localStorage.getItem("loggedInId");
    let sendBody = { "CheckId": id };

    fetchWithBody(fetchURL + '/api/Products/' + id, "POST", sendBody)
    .then((response) => {
      this.setState({
        dataToLoad: response
      });
      console.log(this.state.dataToLoad)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  async createProduct() {
    let sendBody = { "ProductName": this.state.productName, "ProductDescription": this.state.productDescription, "ProductPrice": this.state.productPrice, "UserId": this.props.id};

    return await fetchWithBody(fetchURL + '/api/Products', "POST", sendBody);
  }

  handleRemoveProduct(e) {
    let productid = e.target.id.split("removeProduct")[1];
    let id = localStorage.getItem("loggedInId");
    let sendBody = { "CheckId": id, "ProductToRemove": productid };

    fetchWithBody(fetchURL + '/api/Products/' + id, "DELETE", sendBody)
    .then((response) => {
      console.log(response);
      this.fetchProducts()

    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    this.createProduct().then((response) => {
      this.setState({
        formStateMessage: response.message
      });
      this.fetchProducts();
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleProductName(e) {
    this.setState({ "productName": e.target.value });
  }

  handleProductDescription(e) {
    this.setState({ "productDescription": e.target.value });
  }

  handleProductPrice(e) {
    this.setState({ "productPrice": e.target.value });
  }

  render() {
    return(
      <div className="add-product-container">
        <div className="add-product-inner-container"> {/* add product box */}
          <div>
            <h1>Add a product</h1>
          </div>
          <form onSubmit={this.handleSubmit} name="myForm">
            <div>
              <label>
                <div>Product name</div>
                <input type="text" name="productName" onChange={this.handleProductName}></input>
              </label>
            </div>
            <div>
              <label>
                <div>Price</div>
                <input type="number" name="productPrice" onChange={this.handleProductPrice} step=".01"></input>
              </label>
            </div>
            <div>
              <label>
                <div>Product description</div>
                <textarea onChange={this.handleProductDescription}></textarea>
              </label>
            </div>
            <input type="submit" value="Add Product" onClick={this.handleSubmit}></input>
          </form>
          <div id="formStateMessage">{this.state.formStateMessage}</div>
        </div> {/* end add product box */}
        <div className="add-product-inner-container"> {/* remove product box */}
          <div>
            <h1>My Products</h1>
          </div>
          <div>
            {
              this.state.dataToLoad.map((product, i) => {
                return (
                  <div className="myProductContainer" key={i}>
                    <div className="myProductInnerContainer">
                      <div>Product: {product.productName}</div>
                      <div>Product price: ${product.productPrice}</div>
                      <input type="hidden" id="prodId" name="prodId" value={product.productsId}></input>
                      <input type="button" id={"removeProduct"+product.productsId} value="Delete product" onClick={this.handleRemoveProduct}></input>
                    </div>
                  </div>
                ) //end return
              }) //end map
            }
          </div>
        </div>
      </div>
    )
  }
}
