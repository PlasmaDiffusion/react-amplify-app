import React, { Component } from "react";
import { getClientUrl, getServerUrl } from "../getUrl.js";
import axios from "axios";
import QuantityButtons from "./quantityButtons";
import AddToCart from "./cartComponents/addToCart";

//A component that shows information of the product and the ability to add one or more of it to your cart.
class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      name: "",
      description: "",
      price: "",
      id: -1,
      imageLink: "",
      amountInStock: 0,
      amountToAdd: 1,
    };

    this.updateAmountToAdd = this.updateAmountToAdd.bind(this);
  }

  //Load in data of this specific product from the database
  componentDidMount() {
    var url = new URLSearchParams(window.location.search);
    var id = url.get("id");

    //Id defaults to 1
    if (!id) id = 1;

    //Read in the data for this product from the server database
    axios.get(getServerUrl() + "/read/shopItem/" + id).then((res) => {
      this.setState({
        name: res.data.name,
        description: res.data.description,
        price: res.data.price,
        id: res.data.id,
        imageLink: res.data.imageLink,
        amountInStock: res.data.amountInStock,
        loaded: true,
      });
    });
  }

  updateAmountToAdd(amount) {
    this.setState({ amountToAdd: amount });
  }

  render() {
    if (this.state.loaded)
      return (
        <React.Fragment>
          <div className="container">
            <img
              src={this.state.imageLink}
              width={256}
              height={256}
              title={this.state.name}
              onClick
            />

            <div>
              <a href={"?id=" + this.state.id}>
                <h2>{this.state.name}</h2>
              </a>
              <p>${this.state.price}</p>
              <p>{this.state.description}</p>
            </div>

            <div className="row">
              <QuantityButtons
                max={this.state.amountInStock}
                min={1}
                stockAmount={this.state.amountInStock}
                amount={this.state.amountInStock > 0 ? 1 : 0} //Either default 1 or 0 if nothing in stock
                onAmountChanged={this.updateAmountToAdd}
              />
            </div>

            <div className="row searchResult">
              <AddToCart
                productId={this.state.id}
                amountInStock={this.state.amountInStock}
                amountToAdd={this.state.amountToAdd}
              />
            </div>
          </div>
        </React.Fragment>
      );
    else return "Loading...";
  }
}

export default ProductPage;
