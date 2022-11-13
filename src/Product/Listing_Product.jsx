import React, { Component } from "react";
import ProductCard from "./Card_Product";

import { PropTypes } from "prop-types";

import FilterContext from "../context/Context_Filter";

import NotFound from "./PageNotFound";

import { CATEGORY_PRODUCTS } from "../graphql/Queries";
import Client from "../graphql/ApolloClient";

const getCategoryProducts = async (category) => {
  try {
    const response = await Client.query({
      query: CATEGORY_PRODUCTS,
      variables: { category },
    });
    return response;
  } catch (err) {
    alert(err);
  }
};

class ProductListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
    };
  }

  static contextType = FilterContext;

  componentDidUpdate(prevProps, prevState) {
    const { verifyCategory } = this.context;
    let { category = "all" } = this.props.params;
    const prevCategory = verifyCategory(prevProps.params.category).value;
    category = verifyCategory(category).value;
    if (!category) {
      return;
    }
    const { products } = this.state;
    if (prevCategory !== category || !products?.length) {
      getCategoryProducts(category).then((response) => {
        const { products } = response.data.category;
        this.setState({ products });
      });
    }
  }

  componentDidMount() {
    const { verifyCategory } = this.context;
    let { category = "all" } = this.props.params;
    category = verifyCategory(category).value;
    if (!category) {
      return;
    }
    getCategoryProducts(category).then((response) => {
      const { products } = response.data.category;
      this.setState({ products });
    });
  }

  renderProducts() {
    const { products } = this.state;
    let { category } = this.props.params;
    const { verifyCategory } = this.context;
    return (
      <div className="products">
        <div className="container">
          <h2 className="category-title fs-12">
            {verifyCategory(category).value}
          </h2>
          <div className="products-wrapper">
            {products?.map((product) => {
              return <ProductCard product={product} key={product.id} />;
            })}
          </div>
        </div>
      </div>
    );
  }

  render() {
    let { category } = this.props.params;
    const { verifyCategory } = this.context;
    if (verifyCategory(category).status === "loading") {
      return;
    } else if (verifyCategory(category).value) {
      return this.renderProducts();
    }
    return <NotFound />;
  }
}

ProductListing.propTypes = {
  params: PropTypes.object,
};

export default ProductListing;
