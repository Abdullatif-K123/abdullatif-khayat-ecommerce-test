import React, { Component } from "react";
import FilterContext from "../context/Context_Filter";
import CartItem from "./Item_Cart";
import { CartContext } from "../context/Context_Cart";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      selectedPhotos: {},
    };
  }
  static contextType = CartContext;

  componentDidMount() {
    const selectedPhotos = {};
    this.context.cart.forEach((cartProduct) => {
      selectedPhotos[cartProduct.uuid] = 0;
    });
    this.setState({ selectedPhotos });
  }

  changeSelectedPhoto(uuid, index) {
    const selectedPhotos = { ...this.state.selectedPhotos };
    selectedPhotos[uuid] = index;
    this.setState({ selectedPhotos });
  }

  render() {
    return (
      <div className="cart container">
        <h2 className="cart-title fs-12">CART</h2>
        <div className="cart-items">
          {this.context.cart.map((product) => (
            <CartItem
              cartProduct={product}
              key={product.cartId}
              selectedPhoto={this.state.selectedPhotos[product.uuid]}
              changeSelectedPhoto={this.changeSelectedPhoto.bind(this)}
            />
          ))}
        </div>
        <FilterContext.Consumer>
          {(context) => (
            <div className="cart-summary">
              <table className="text fs-6">
                <tbody>
                  <tr>
                    <td>Tax 21%: </td>
                    <td>
                      <strong>
                        {context.currency?.symbol}
                        {Math.round(
                          this.context.cartPriceSum(context.currency) *
                            0.21 *
                            100
                        ) / 100}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Quantity:</td>
                    <td>
                      <strong>{this.context.cartQuantitySum()}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Total:</td>
                    <td>
                      <strong>
                        {context.currency?.symbol}
                        {this.context.cartPriceSum(context.currency)}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="big-btn primary-btn btn">ORDER</button>
            </div>
          )}
        </FilterContext.Consumer>
      </div>
    );
  }
}

export default Cart;
