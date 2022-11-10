import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    isEmpty: true,
    cartItems: [],
  };

  componentDidMount() {
    const cartItemRecovered = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItemRecovered) {
      this.setState({
        isEmpty: false,
        cartItems: cartItemRecovered,
      });
    }
  }

  render() {
    const { isEmpty, cartItems } = this.state;
    return (
      <div>
        {
          isEmpty ? (
            <h1 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h1>)
            : (
              cartItems.map(({ title, price, id, thumbnail }) => (
                <div key={ id }>
                  <h3 data-testid="shopping-cart-product-name">{title}</h3>
                  <img
                    src={ thumbnail }
                    alt={ title }
                  />
                  <p>{price}</p>
                  <p data-testid="shopping-cart-product-quantity">1</p>
                </div>
              ))
            )
        }
      </div>
    );
  }
}

export default ShoppingCart;
