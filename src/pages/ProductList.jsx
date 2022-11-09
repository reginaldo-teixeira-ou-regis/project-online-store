import React, { Component } from 'react';

export default class ProductList extends Component {
  state = {
    isEmpty: true,
  };

  render() {
    const { isEmpty } = this.state;
    return (
      <div>
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
