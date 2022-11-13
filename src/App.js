import { Component } from "react";
import ProductListing from "./Product/Listing_Product";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Header/Navbar";
import { CartProvider } from "./context/Context_Cart";
import Cart from "./cart/Cart";
import ProductDetails from "./Product/Details_Product";
import { FilterProvider } from "./context/Context_Filter";
import WithRouter from "./Product/HOC/Routers";
import NotFound from "./Product/PageNotFound";

class App extends Component {
  render() {
    return (
      <FilterProvider>
        <CartProvider>
          <header>
            <WithRouter WrappedComponent={Navbar} />
          </header>
          <main>
            <Routes>
              <Route
                exact
                path="/:category"
                element={<WithRouter WrappedComponent={ProductListing} />}
              />
              <Route
                exact
                path="/"
                element={<WithRouter WrappedComponent={ProductListing} />}
              />
              <Route exact path="/cart" element={<Cart />} />
              <Route
                exact
                path="/product/:id"
                element={<WithRouter WrappedComponent={ProductDetails} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </CartProvider>
      </FilterProvider>
    );
  }
}

export default App;
