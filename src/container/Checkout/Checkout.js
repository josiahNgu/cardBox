import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import CartSummary from "../../components/CartSummary/CartSummary";
import "./Checkout.scss";
class Checkout extends Component {
  state = {
    deliveryOptions: {
      economy: {
        price: "$7.00"
      },
      standard: {
        price: "$3.00"
      }
    },
    shippingDetails: {
      shippingName: {
        label: "Full Name",
        elementType: "shippingInput",
        elementConfig: {
          placeholder: "John Turing",
          type: "text"
        },
        value: ""
      },
      street: {
        label: "Street",
        elementType: "shippingInput",
        elementConfig: {
          placeholder: "O st",
          type: "text"
        },
        value: ""
      },
      city: {
        label: "City",
        elementType: "shippingInput",
        elementConfig: {
          placeholder: "Lincoln",
          type: "text"
        },
        value: ""
      },
      state: {
        label: "State",
        elementType: "shippingInput",
        elementConfig: {
          placeholder: "Nebraska",
          type: "text"
        },
        value: ""
      },
      zip: {
        label: "Zip",
        elementType: "shippingInput",
        elementConfig: {
          placeholder: "68503",
          type: "text"
        },
        value: ""
      }
    },
    error: {}
  };
  inputChangedHandler = (event, elementName) => {
    const updatedField = {
      ...this.state.shippingDetails,
      [elementName]: {
        ...this.state.shippingDetails[elementName],
        value: event.target.value
      }
    };
    this.setState({ shippingDetails: updatedField });
  };
  submitHandler = event => {
    event.preventDefault();
  };
  routePaymentPage = () => {
    const path = "/payment";
    this.props.history.push(path);
  };

  shippingInputGenerator = value => {
    return (
      <Input
        elementTypes={this.state.shippingDetails[value].elementType}
        elementConfig={this.state.shippingDetails[value].elementConfig}
        value={this.state.shippingDetails[value].value}
        changed={event => this.inputChangedHandler(event, value)}
      />
    );
  };
  render() {
    return (
      <div className="Checkout ">
        <div className=" container">
          <div className="col-md-6 Delivery">
            <h5>DELIVERY</h5>
            <input type="checkbox" />
            <span className="col-md-8">
              Standard Delivery 3-5 business days
            </span>
            <span className="col-md-4">
              {this.state.deliveryOptions.standard.price}
            </span>
            <br />
            <input type="checkbox" />
            <span className="col-md-8">
              Economy Delivery 5-10 business days
            </span>
            <span className="col-md-4">
              {this.state.deliveryOptions.economy.price}
            </span>
            <br />
          </div>

          <div className="ShippingForm ">
            <h5>ADDRESS</h5>
            <label>Full Name</label>
            {this.shippingInputGenerator("shippingName")}
            <label>Street</label>
            {this.shippingInputGenerator("street")}
            <label>City</label>
            {this.shippingInputGenerator("city")}
            <label>State</label>
            {this.shippingInputGenerator("state")}
            <label>Zip</label>
            {this.shippingInputGenerator("zip")}
            <label>Phone </label>
          </div>
        </div>
        <CartSummary
          shipping="economy"
          buttonText="PROCCEED TO PAYMENT"
          clicked={this.routePaymentPage}
        />
      </div>
    );
  }
}

export default Checkout;
