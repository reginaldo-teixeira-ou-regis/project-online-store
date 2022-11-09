import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    isEmpty: true,
  };

  render() {
    const { isEmpty } = this.state;
    return (
      <div>
        {
          isEmpty ? (
            <h1 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h1>)
            : <p>Teste</p>
        }
      </div>
    );
  }
}

export default ShoppingCart;
