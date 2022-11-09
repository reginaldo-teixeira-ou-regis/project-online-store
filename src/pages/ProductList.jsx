import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class ProductList extends Component {
  state = {
    isEmpty: true,
    categories: [],
    category: '',
    inputSearch: '',
    products: '',
    isSearched: false,
  };

  componentDidMount() {
    this.loadCategories();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleProductsExhibition);
  };

  handleProductsExhibition = async () => {
    const { inputSearch, category } = this.state;
    const responseAPI = await getProductsFromCategoryAndQuery(category, inputSearch);
    this.setState({
      isEmpty: false,
      products: responseAPI.results,
      isSearched: true,
    });
  };

  loadCategories = () => {
    getCategories().then((data) => this.setState({
      categories: data,
    }));
  };

  render() {
    const { isEmpty, categories, products, isSearched, inputSearch } = this.state;
    return (
      <div>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Carrinho de Compra
        </Link>
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
                onChange={ this.handleChange }
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
