import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/Context_Cart";
import CartItem from "./Item_Cart";
import FilterContext from "../context/Context_Filter";
import { PropTypes } from "prop-types";

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
    };
    this.overlayWrapperRef = createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleShowCart = this.toggleShowCart.bind(this);
  }

  static contextType = CartContext;
  componentDidUpdate() {
    const { showCart } = this.state;
    if (!this.inCart() || !showCart) {
      return;
    }
    this.setState({ showCart: false });
  }

  toggleShowCart() {
    this.setState((state) => {
      return { showCart: !state.showCart };
    });
  }

  handleClickOutside(e) {
    const { current } = this.overlayWrapperRef;
    if (current.contains(e.target)) {
      return;
    }
    this.setState({ showCart: false });
  }

  inCart() {
    return this.props.location.pathname === "/cart";
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  renderTotal() {
    return (
      <FilterContext.Consumer>
        {(filterContext) => (
          <div className="cart-total fw-bold">
            <p className="reset">Total</p>
            <p className="reset">
              {filterContext.currency?.symbol}
              {this.context.cartPriceSum(filterContext.currency)}
            </p>
          </div>
        )}
      </FilterContext.Consumer>
    );
  }
  renderCartOverlayBtns() {
    return (
      <div className="cart-overlay-buttons">
        <Link
          className="reset btn neutral-btn fs-3"
          to="/cart"
          onClick={this.toggleShowCart}
        >
          VIEW BAG
        </Link>
        <button className="btn primary-btn fs-3">CHECK OUT</button>
      </div>
    );
  }
  renderCartOverlayFooter() {
    return (
      <>
        {this.renderTotal()}
        {this.renderCartOverlayBtns()}
      </>
    );
  }

  render() {
    const { showCart } = this.state;
    return (
      <>
        <div ref={this.overlayWrapperRef} className="cart-overlay">
          <button
            className="cart-btn reset btn fs-4 fw-medium"
            onClick={() => this.toggleShowCart()}
          >
            <img
              src={process.env.PUBLIC_URL + "/images/svg-cart.svg"}
              alt="cart"
              className="cart-logo"
            />
            ``
            <div className={`cart-count fs-2`}>
              {this.context.cartQuantitySum()}
            </div>
          </button>
          <div className={`overlay ${!showCart && "hidden"}`}>
            {this.context.cartQuantitySum() !== 0 && (
              <h4 className="reset fw-regular fs-4 ">
                {" "}
                <strong>My Bage</strong>, {this.context.cartQuantitySum()} items
              </h4>
            )}
            {this.context.cartQuantitySum() === 0 && (
              <h4 className="reset fw-regular fs-4 center-text">
                <strong>Your cart is empty</strong>
              </h4>
            )}

            {this.context.cart.map((cartProduct) => (
              <CartItem
                cartProduct={cartProduct}
                key={cartProduct.cartId}
                small
              />
            ))}
            {!!this.context.cart.length && this.renderCartOverlayFooter()}
          </div>
        </div>
        {showCart && <div className="gray-cover"></div>}
      </>
    );
  }
}

CartOverlay.propTypes = {
  location: PropTypes.object,
};

export default CartOverlay;
