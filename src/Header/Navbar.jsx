import React, { Component } from "react";
import { FilterContext } from "../context/Context_Filter";
import { PropTypes } from "prop-types";
import WithRouter from "../Product/HOC/Routers";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import CartOverlay from "../cart/Overlay_Cart";

class Navbar extends Component {
  static contextType = FilterContext;

  checkCategory(category) {
    const { pathname } = this.props.location;
    if (
      (pathname === "/" && category === "all") ||
      pathname.replace("/", "") === category
    ) {
      return "selected";
    }
    return "";
  }

  renderNavLink(category) {
    return (
      <li className="list-item" key={category}>
        <Link
          className={`link fs-4 fw-sbold anchor-color ${this.checkCategory(
            category
          )}`}
          to={category !== "all" ? `/${category}` : ""}
        >
          {category.toUpperCase()}
        </Link>
      </li>
    );
  }

  render() {
    const { currencies, switchCurrency, currency, categories } = this.context;
    return (
      <nav>
        <div className="container">
          <ul className="navigation reset">
            {categories?.map((category) => this.renderNavLink(category))}
          </ul>
          <button className="btn logo">
            <img
              src={process.env.PUBLIC_URL + "/images/svg-logo.svg"}
              alt="logo"
            />
          </button>
          <div className="actions">
            <DropDown
              list={currencies}
              onSelect={switchCurrency}
              selected={currency}
            />
            <WithRouter WrappedComponent={CartOverlay} />
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  location: PropTypes.object,
  navigate: PropTypes.func,
};

export default Navbar;
