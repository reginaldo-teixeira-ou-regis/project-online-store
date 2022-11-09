import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProductList extends Component {
  state = {
    isEmpty: true,
  };

  render() {
    const { isEmpty } = this.state;
    return (
      <div>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Carrinho de Compra
        </Link>
        <input type="text" placeholder="Digite aqui" />
        { isEmpty
          ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
          : 'a' }
      </div>
    );
  }
}
