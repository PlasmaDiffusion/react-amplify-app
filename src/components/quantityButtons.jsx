import React, { Component } from "react";

//The + and - buttons for changing the item amount to have in a cart.
class QuantityButtons extends Component {
  constructor(props) {
    super(props);

    this.state = { amount: this.props.amount };

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onIncrement() {
    //Make sure the amount doesn't go over max
    if (this.props.max - this.state.amount > 0) {
      this.props.onAmountChanged(this.state.amount + 1); //Update amount for parent component early because setState is asyncrhonous
      this.setState({ amount: this.state.amount + 1 });
    }
  }

  onDecrement() {
    //Make sure the amount doesn't go under 0
    if (this.state.amount > this.props.min) {
      this.props.onAmountChanged(this.state.amount - 1); //Update amount for parent component early because setState is asyncrhonous
      this.setState({ amount: this.state.amount - 1 });
    }
  }

  render() {
    return (
      <div className="container searchResult">
        <div className="row">
          <div className="col-sm-4">
            <button
              id="decrement"
              className="btn-lightOrange btn-quantity"
              onClick={this.onDecrement}
            >
              -
            </button>
            <p style={{margin: "2rem", display:"inline"}}>{this.state.amount}</p>
            <button
              id="increment"
              className="btn-darkOrange btn-quantity"
              onClick={this.onIncrement}
            >
              +
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <p style={{margin: "2rem"}}>
              <i>{this.props.stockAmount} in stock</i>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default QuantityButtons;
