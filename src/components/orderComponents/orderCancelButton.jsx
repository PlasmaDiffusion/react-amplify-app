import React, { Component } from 'react';
import axios from "axios";
import { getServerUrl, getClientUrl } from "../../getUrl.js";


//Handles all code needed to tell the server to cancel an order.
class OrderCancelButton extends Component {
    constructor(props) {
        super(props);

        this.cancelOrder = this.cancelOrder.bind(this);
        this.setupCancelData = this.setupCancelData.bind(this);

        this.state = {cancelled: false}
    }


    componentDidMount() {

        console.log("Order cancel data: ", this.props);
    }

    cancelOrder()
    {
        //Have to have an order id prepared.
        if (this.props.orderId && !this.props.cancelled)
        {
            if(window.confirm("Cancel this order?"))
                this.setupCancelData();
        }
    }

    setupCancelData()
    {
        //Go through all items in the cart, get their ids into an array and quantities into an array.
        if (this.props.cart)
        {
            let shopItemIds = [];
            let itemQuantities = [];

            console.log(this.props.cart.cartItems);

            this.props.cart.cartItems.forEach(item => {
                
                shopItemIds.push(item.shopItemId);
                itemQuantities.push(item.amountInCart);
            });

            console.log("Order cancel Arrays: ", shopItemIds, itemQuantities);

            axios.post(getServerUrl() + "/delete/order", {id:this.props.orderId, shopItemIds:shopItemIds, itemQuantities:itemQuantities})
            .then((res) => {

                alert(res.data);
                this.setState({cancelled: true})

            });
        }
        else
        {
            alert("Error cancelling order.");
        }
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-danger" onClick={this.cancelOrder}> {this.state.cancelled ? "Cancelled!" : "Cancel Order"} </button>
            </React.Fragment>
        );
    }
}

export default OrderCancelButton;