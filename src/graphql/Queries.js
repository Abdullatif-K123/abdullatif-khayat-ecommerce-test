import { gql } from "@apollo/client/core";

const CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

const CATEGORY_PRODUCTS = gql`
  query ($category: String!) {
    category(input: { title: $category }) {
      products {
        id
        name
        inStock
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;
const CATEGORIES_NAMES = gql`
  query {
    categories {
      name
    }
  }
`;
const PRODUCT_DETAILS = gql`
  query ($id: String!) {
    product(id: $id) {
      name
      inStock
      description
      gallery
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
      attributes {
        id
        name
        type
        items {
          displayValue
          id
          value
        }
      }
    }
  }
`;
const CART_PRODUCT = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      gallery
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
      attributes {
        id
        name
        type
        items {
          displayValue
          id
          value
        }
      }
    }
  }
`;

export {
  CATEGORY_PRODUCTS,
  CATEGORIES_NAMES,
  CURRENCIES,
  PRODUCT_DETAILS,
  CART_PRODUCT,
};
