import { arrayOf, bool, func, shape } from 'prop-types';
import React, { Component } from 'react';
import ListItemCard from '../Components/ListItemCard';
import { getCategories } from '../services/api';

export default class ProductList extends Component {
  state = {
    categories: [],
    cartItems: localStorage.cartItems
      ? JSON.parse(localStorage.cartItems)
      : [],
  };

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories = () => {
    getCategories().then((data) => this.setState({
      categories: data,
    }));
  };

  saveCartItem = ({ target }) => {
    const { cartItems } = this.state;
    const { countCart, products } = this.props;
    const getItem = products.find((item) => item.id === target.id);
    const hadItem = cartItems.some((item) => item.id === getItem.id);
    if (!hadItem) {
      getItem.quantity = 1;
      cartItems.push(getItem);
      localStorage.cartItems = JSON.stringify(cartItems);
      this.setState({ cartItems });
    } else {
      cartItems.forEach((item) => {
        if (item.id === target.id && item.quantity < item.available_quantity) {
          item.quantity += 1;
        }
      });
      localStorage.cartItems = JSON.stringify(cartItems);
      this.setState({ cartItems });
    }
    countCart();
  };

  render() {
    const {
      saveCartItem,
      props: {
        isEmpty,
        products,
        isSearched,
        handleChange,
        handleProductsExhibition,
      },
      state: {
        categories,
      },
    } = this;

    return (
      <div>
        {
          categories.map(({ id, name }) => (
            <label
              htmlFor={ id }
              key={ id }
              data-testid="category"
            >
              <input
                type="radio"
                name="category"
                id={ id }
                value={ id }
                onChange={ (event) => (
                  handleChange(event, handleProductsExhibition)
                ) }
              />
              { name }
            </label>
          ))
        }
        {isEmpty
          && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
        {isSearched && ((products.length > 0)
          ? (
            products.map((product) => (
              <ListItemCard
                saveCartItem={ saveCartItem }
                product={ product }
                key={ product.id }
              />
            ))
          )
          : (
            <p>
              Nenhum produto foi encontrado
            </p>
          ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  handleChange: func.isRequired,
  countCart: func.isRequired,
  isEmpty: bool.isRequired,
  products: arrayOf(shape({})).isRequired,
  isSearched: bool.isRequired,
  handleProductsExhibition: func.isRequired,
};
