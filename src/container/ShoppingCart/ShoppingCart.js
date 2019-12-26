import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ShoppingCartItem from "../../components/ShoppingItem/ShoppingItem";
import CartSummary from "../../components/CartSummary/CartSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./ShoppingCart.css";
class ShoppingCart extends Component {
  componentDidMount() {
    if (localStorage.getItem("idToken")) {
      this.props.initShoppingCart();
    } else if (localStorage.getItem("shoppingList")) {
      this.props.initLocalShoppingCart();
    }
  }
  routeCheckoutPage = () => {
    this.props.isCheckingOut();
    const path = "/checkout";
    this.props.history.push(path);
  };
  render() {
    let shoppingCart = <Spinner />;
    const updatedSC = JSON.parse(localStorage.getItem("updatedSC"));
    let totalPrice = 0;
    if (updatedSC) {
      shoppingCart = updatedSC.map(item => (
        <ShoppingCartItem
          key={item.itemName}
          imageURL={item.imageURL}
          itemName={item.itemName}
          price={item.price}
          quantity={item.quantity}
        />
      ));
      for (let i = 0; i < updatedSC.length; i++) {
        totalPrice = totalPrice + updatedSC[i].price * updatedSC[i].quantity;
      }
    } else {
      shoppingCart = "Your shopping Bag is empty";
    }
    return (
      <div className="ShoppingCart">
        <div className="text-center">
          <p className="Header">YOUR SHOPPING BAG</p>
          <p>Total Cost : ${totalPrice}</p>
        </div>
        <div className="row container">
          <div className="col-sm-4">
            <p>SECURE SHOPPING</p>
            <p>
              We accept all major credit and debit cards. Visa, MasterCard,
              American Express and Paypal
            </p>
          </div>
          <div className="col-sm-4">
            <p>PAYMENT OPTIONS</p>
            <p>
              We accept all major credit and debit cards. Visa, MasterCard,
              American Express and Paypal
            </p>
          </div>
        </div>
        <div className="ShoppingCartList">{shoppingCart}</div>
        <CartSummary
          shipping="economy"
          buttonText="Proceed to Checkout"
          orderPrice={totalPrice.toFixed(2)}
          clicked={this.routeCheckoutPage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    shoppingList: state.shoppingCart.shoppingList,
    totalPrice: state.shoppingCart.totalPrice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    initShoppingCart: () => dispatch(actions.initShoppingList()),
    initLocalShoppingCart: () => dispatch(actions.initLocalShoppingList()),
    getTotalPrice: () => dispatch(actions.getTotalPrice()),
    isCheckingOut: () => dispatch(actions.isCheckingOut())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);