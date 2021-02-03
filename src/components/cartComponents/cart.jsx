import React, { Component } from "react";
import CartItem from "../cartComponents/cartItem";
import Profile from "../profile";
import OrderList from "../orderComponents/orderList"

import { getClientUrl, getServerUrl } from "../../getUrl.js";

import axios from "axios";
import QuantityButtons from "../quantityButtons";

//Renders all items in the user's cart, along with the total cost.
class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: -1,
      totalPrice: 0.0,
      cartItems: [],
      initialMaxAmounts: [], //Original max amounts, so you don't have more items than are in stock
      amountToDisplayInStock: [], //Starting stock amount?
      initialCartAmounts: [], //Initial, saved cart amounts
      placingOrder: false,
    };

    //We read this from profile
    this.user = null;

    this.showItemsInCart = this.showItemsInCart.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    //Test out displaying items if the test prop is set
    if (this.props.test) {
      let testCartItems = [
        {
          id: 1,
          shopItemId: 1,
          amountInCart: 1,
          amountInStock: 8,
          name: "Apple",
          imageLink: "https://i.imgur.com/1Gfgzhn.jpg",
          price: 1.99,
        },
        {
          id: 2,
          shopItemId: 2,
          amountInCart: 1,
          amountInStock: 10,
          name: "Paper",
          imageLink: "https://i.imgur.com/NgnLO5G.jpg",
          price: 5.99,
        },
      ];
      this.setState({
        cartItems: testCartItems,
      });
      return;
    }
    //Read in the cart data of a user
    const request = { username: this.user };

    if (!this.user) {
      //TODO: Make an anonymous cart work
      alert("User not loaded yet. A new cart can't be created");
      return;
    }

    axios.post(getServerUrl() + "/read/cart", request).then((cartRes) => {
      this.setState({
        id: cartRes.data.id,
        totalPrice: cartRes.data.totalPrice,
      });

      console.log(cartRes);

      //After getting the id it's time to search for items within the cart
      axios
        .get(getServerUrl() + "/read/cartItems/" + this.state.id)
        .then((cartItemRes) => {
          this.setState({
            cartItems: cartItemRes.data,
          });

          //Set initial amount array (This is used for recording the original max)
          let initialMax = [];
          let amountToDisplay = [];
          let initialCartAmounts = [];
          console.log("Cart data", cartItemRes.data);
          for (let i = 0; i < cartItemRes.data.length; i++) {
            let item = cartItemRes.data[i];
            initialMax.push(item.amountInStock + item.amountInCart);
            amountToDisplay.push(item.amountInStock);
            initialCartAmounts.push(item.amountInCart);
          }
          this.setState({
            initialMaxAmounts: [...initialMax],
            amountToDisplayInStock: [...amountToDisplay],
            initialCartAmounts: [...initialCartAmounts],

          });
        });
    });
  }

  showItemsInCart() {
    return (
      <div className="container">
        {this.state.cartItems.map((product, index) => (
          <div className="row" key={index}>
            <CartItem product={product} id={product.shopItemId} amountInCart={product.amountInCart} imageSize={128} cartId={this.state.id} />
            <QuantityButtons
              max={this.state.initialMaxAmounts[index]}
              min={1}
              stockAmount={this.state.amountToDisplayInStock[index]}
              amount={product.amountInCart}
              onAmountChanged={(newAmount) => {
                //Function that updates item count
                var arr = this.state.cartItems;
                arr[index].amountInCart = newAmount;
                this.setState({ cartItems: [...arr] });
              }}
            />
            <div style={{ margin: "10px" }}></div>
            <br></br><br></br><br></br><br></br><br></br>

          </div>
        ))}
      </div>
    );
  }

  getUsername(username) {
    this.user = username;
  }

  //Show a confirm message before placing an order.
  placeOrder()
  {
    //Of course do nothing if there's no price
    if (this.state.totalPrice <= 0.0) return;

    var text = "The following order will be placed: \n";
    
    //Add each product name along with their saved amounts to the message.
    this.state.cartItems.map((item, index) =>{
      text += item.name + " (" + this.state.initialCartAmounts[index] + ")\n";
    });

    text += "\nTotal Price: $" + this.state.totalPrice;
    
    text +="\n(Make sure all item quantities were updated if you changed them.)"

    var msg = window.confirm(text);

    //Confirm the order. If the user says yes, the state will change and the OrderList should handle the rest.
    if (msg)
    {
      this.setState({placingOrder: true});
    }

  }

  render() {
    return (
      <React.Fragment>
        <Profile onAuthenticated={this.getUsername} invisible={true} />
        {this.showItemsInCart()}
        {this.state.totalPrice > 0 ? (<div className="container">
          <h3>
          Total Price: $<i>{this.state.totalPrice}</i>
          </h3>
          <button className="btn-orange btn-wide" onClick={this.placeOrder} >Place Order</button>
          <div style={{ margin: "100px" }}></div>
        </div>)
        : (<div className="container"><br></br><p>Your cart seems to be empty.</p></div> )}

        <OrderList id={this.state.id} placingOrder={this.state.placingOrder} user={this.user}/>
      </React.Fragment>
    );
  }
}

export default Cart;
