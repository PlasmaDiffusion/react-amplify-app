import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Loading from "../loading";
import Profile from "../profile";
import axios from "axios";
import { getClientUrl, getServerUrl } from "../../getUrl.js";

import {
  submitProduct,
  updateProduct,
} from "../adminComponents/formServerFunctions.js";

//A form that either is for creating a new product or updating an existing one.
//If updating, read in product data. Display form, and call a submitter component when finished.
class ShopItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      imageLink: "",
      price: null,
      amountInStock: null,
      category: "All",
      categories: [],
    };

    this.user = "";

    //Bind input functions here
    this.onChangeField = this.onChangeField.bind(this);
    this.onSubmitShopItem = this.onSubmitShopItem.bind(this);

    this.adminCheck = this.adminCheck.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  //Load stuff from the data base here if editing
  componentDidMount() {
    if (this.props.updatingItem) {
      //Find the id as a search parameter like ?id=334
      let url = new URLSearchParams(window.location.search);
      let id = url.get("id");
      if (!id) return;

      axios.get(getServerUrl() + "/read/shopItem/" + id).then((res) => {
        this.setState({
          name: res.data.name,
          description: res.data.description,
          imageLink: res.data.imageLink,
          price: res.data.price,
          amountInStock: res.data.amountInStock,
          category: res.data.category,
        });
      });
    }

    //Get all categories the user can pick
    axios.get(getServerUrl() + "/read/categories/").then((res) => {
      this.setState({ categories: res.data });
    });
  }

  //Submit form data here
  onSubmitShopItem(e) {
    e.preventDefault();

    //Either add a new item or update an existing one
    if (this.props.updatingItem) {
      let url = new URLSearchParams(window.location.search);
      let id = url.get("id");
      updateProduct(this.state, id, this.user);
    } else {
      submitProduct(this.state, this.user);
    }
  }

  onChangeField(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });

    //console.log(this.state);
  }

  //A profile component will call this function to send the user that's currently logged in
  adminCheck(username) {
    //this.setState({ user: username });
    this.user = username;
  }

  getCategories() {
    return this.state.categories.map((category, index) => (
      <option>{category.name}</option>
    ));
  }

  render() {
    return (
      <React.Fragment>
        <Profile adminPage={true} onAuthenticated={this.adminCheck}></Profile>
        <h1>
          {this.props.updatingItem ? "Edit a Product" : "Add a new Product"}
        </h1>
        <form onSubmit={this.onSubmitShopItem}>
          <div className="form-group">
            <label>Name: </label>
            <input
              name="name"
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeField}
              required
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              name="description"
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeField}
              required
            />
          </div>
          <div className="form-group">
            <label>Image Link: </label>
            <input
              name="imageLink"
              type="text"
              className="form-control"
              value={this.state.imageLink}
              onChange={this.onChangeField}
              required
            />
          </div>
          <div class="form-group">
            <label for="category">Category:</label>
            <select
              name="category"
              class="form-control"
              id="category"
              onChange={this.onChangeField}
              value={this.state.category}
            >
              {this.getCategories()}
            </select>
          </div>
          <div className="form-group">
            <label>Price:</label>
            <br></br>
            <input
              name="price"
              type="number"
              className="form-control-sm"
              value={this.state.price}
              onChange={this.onChangeField}
              step={0.01}
              required
            />
          </div>
          <div className="form-group">
            <label>Amount In Stock:</label>
            <br></br>
            <input
              name="amountInStock"
              type="number"
              className="form-control-sm"
              value={this.state.amountInStock}
              onChange={this.onChangeField}
              step={1}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value={this.props.updatingItem ? "Update Product" : "Add Product"}
              className="btn btn-primary"
            />
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default ShopItemForm;
