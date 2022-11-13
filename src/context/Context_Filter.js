import { createContext } from "react";

import Client from "../graphql/ApolloClient";
import { CATEGORIES_NAMES, CURRENCIES } from "../graphql/Queries";
import React, { Component } from "react";

const FilterContext = createContext();

class FilterProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      currency: JSON.parse(localStorage.getItem("Abdullatif-currency")),
      currencies: null,
    };
    this.switchCurrency = this.switchCurrency.bind(this);
    this.verifyCategory = this.verifyCategory.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currency?.label !== this.state.currency?.label) {
      localStorage.setItem(
        "Abdullatif-currency",
        JSON.stringify(this.state.currency)
      );
    }
  }
  async setDefaults() {
    try {
      const currenciesRes = await Client.query({ query: CURRENCIES });
      const categoriesRes = await Client.query({ query: CATEGORIES_NAMES });
      const currencies = currenciesRes.data.currencies;
      const categories = categoriesRes.data.categories.map((c) => c.name);
      this.setState((state) => ({
        currencies,
        categories,
        currency: state.currency || currencies[0],
      }));
    } catch (err) {
      alert(err);
    }
  }

  verifyCategory(category = "all") {
    const { categories } = this.state;
    if (!categories) {
      return { status: "loading", value: category };
    }

    return {
      status: "loaded",
      value: categories.includes(category) ? category : false,
    };
  }

  componentDidMount() {
    this.setDefaults();
  }

  switchCurrency(newCurrency) {
    this.setState(() => {
      return { currency: newCurrency };
    });
  }

  render() {
    const { currency, currencies, categories } = this.state;
    const { switchCurrency, verifyCategory } = this;
    return (
      <FilterContext.Provider
        value={{
          currency,
          currencies,
          switchCurrency,
          verifyCategory,
          categories,
        }}
      >
        {this.props.children}
      </FilterContext.Provider>
    );
  }
}

export default FilterContext;

export { FilterProvider, FilterContext };
