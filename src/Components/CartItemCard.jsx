import { func, number, shape, string } from 'prop-types';
import React, { Component } from 'react';

export default class CartItemCard extends Component {
  render() {
    const { product: { title, price, id, thumbnail, quantity },
      handleIncrease, handleDecrease, handleDelete } = this.props;
    return (
      <div>
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
        <img
          src={ thumbnail }
          alt={ title }
        />
        <p>{price}</p>
        <button
          name={ id }
          type="button"
          data-testid="remove-product"
          onClick={ handleDelete }
        >
          x
        </button>
        <button
          name={ id }
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ handleDecrease }
        >
          -
        </button>
        <span data-testid="shopping-cart-product-quantity">{ quantity }</span>
        <button
          name={ id }
          type="button"
          data-testid="product-increase-quantity"
          onClick={ handleIncrease }
        >
          +
        </button>
      </div>
    );
  }
}

CartItemCard.propTypes = {
  product: shape({
    title: string,
    price: number,
    id: string,
    thumbnail: string,
    quantity: number,
  }).isRequired,
  handleDecrease: func.isRequired,
  handleIncrease: func.isRequired,
  handleDelete: func.isRequired,
};
