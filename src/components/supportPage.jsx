import React, { Component } from "react";

//The FAQ page. It's just a render function.
class SupportPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <br></br>
        <h1>FAQ</h1>
        <br></br>
        <div className="list-group">
        <a
            href="#"
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">How can I change the amount of items in my cart?</h5>
            </div>
            <p className="mb-1">
              Once you've logged in you can select Cart, then use the +/- and click on Update Quantity.
            </p>
          </a>

          <a
            href="#"
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">How do I see my past orders?</h5>
              {/*<small>3 days ago</small>*/}
            </div>
            <p className="mb-1">
              Click Cart, and at the top of the page click View Orders. You
              don't have any orders if this doesn't show up.
            </p>
          </a>
         
          <a
            href="#"
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Can I cancel an order?</h5>
            </div>
            <p className="mb-1">
              When viewing your orders, there is a button to cancel any order that's currently in progress.
            </p>
          </a>
          {/*<a
            href="#link"
            id="link"
            className="list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Customer Service</h5>
            </div>
            <p className="mb-1">A live chat service will be made later.</p>
            <small className="text-muted">Click to go to a live chat.</small>
          </a> */}
        </div>
      </div>
    );
  }
}

export default SupportPage;
