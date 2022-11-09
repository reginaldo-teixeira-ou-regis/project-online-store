import React, { Component } from 'react';
import * as api from '../services/api';

export default class ProductList extends Component {
  state = {
    isEmpty: true,
    inputSearch: '',
    products: '',
    isSearched: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleProductsExhibition = async () => {
    const { inputSearch } = this.state;
    const responseAPI = await api.getProductsFromCategoryAndQuery(null, inputSearch);
    this.setState({
      isEmpty: false,
      products: responseAPI.results,
      isSearched: true,
    });
    console.log(responseAPI.results);
  };

  render() {
    const { isEmpty, inputSearch, products, isSearched } = this.state;
    return (
      <div>
        <input
          data-testid="query-input"
          name="inputSearch"
          value={ inputSearch }
          type="text"
          onChange={ this.handleChange }
          placeholder="Digite aqui"
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.handleProductsExhibition }
        >
          Salvar
        </button>
        {isEmpty
          && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
        {isSearched && ((products.length > 0 && typeof products !== 'string')
          ? (
            products.map(({ id, title, thumbnail, price }) => (
              <div
                key={ id }
                data-testid="product"
              >
                <h3>{ title }</h3>
                <img src={ thumbnail } alt={ title } />
                <p>{ price }</p>
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
