import { func } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

export default class ProductList extends Component {
  state = {
    isEmpty: true,
    categories: [],
    isSearched: false,
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
    const { products, cartItems } = this.state;
    const { countCart } = this.props;
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
      isEmpty,
      categories,
      products,
      isSearched,
    } = this.state;

    const { handleChange } = this.props;

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
                  handleChange(event, this.handleProductsExhibition)
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
            products.map(({
              id,
              title,
              thumbnail,
              price,
              shipping: { free_shipping: freeShipping },
            }) => (
              <div key={ id }>
                <Link
                  data-testid="product-detail-link"
                  to={ `/items/${id}` }
                >
                  <div
                    data-testid="product"
                  >
                    <h3>{ title }</h3>
                    <img src={ thumbnail } alt={ title } />
                    <p>{ price }</p>
                    { freeShipping && <p data-testid="free-shipping">Frete gratis</p> }
                  </div>
                </Link>
                <button
                  data-testid="product-add-to-cart"
                  type="button"
                  id={ id }
                  onClick={ this.saveCartItem }
                >
                  Adicionar ao carrinho
                </button>
              </div>
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
};
