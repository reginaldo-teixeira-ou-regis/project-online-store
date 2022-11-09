import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class ProductList extends Component {
  state = {
    isEmpty: false,
    categories: [],
  };

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories = () => {
    getCategories().then((data) => this.setState({
      categories: data,
    }));
  };

  render() {
    const { isEmpty, categories } = this.state;
    return (
      <div>
        <input type="text" placeholder="Digite aqui" />
        {isEmpty
          ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
          : (
            <div>
              {
                categories.map((categorie) => (
                  <label
                    htmlFor={ categorie.id }
                    key={ categorie.id }
                    data-testid="category"
                  >
                    <input
                      type="radio"
                      name="categorias"
                      id={ categorie.id }
                    />
                    {categorie.name}
                  </label>
                ))
              }
            </div>

          )}
      </div>
    );
  }
}
