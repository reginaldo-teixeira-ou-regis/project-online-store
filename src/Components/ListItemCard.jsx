import { bool, func, number, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export default class ListItemCard extends Component {
  render() {
    const {
      saveCartItem,
      product: {
        id,
        title,
        thumbnail,
        price,
        shipping: { free_shipping: freeShipping },
      },
    } = this.props;
    return (
      <div className="produto-container">
        <Link
          data-testid="product-detail-link"
          to={ `/items/${id}` }
        >
          <div
            data-testid="product"
            className="produto-informação"
          >
            <h3>{ title }</h3>
            <img src={ thumbnail } alt={ title } />
            <p className="price">{`R$ ${parseFloat(price, 2)}`}</p>
            { freeShipping && (
              <p
                className="gratis"
                data-testid="free-shipping"
              >
                Frete gratis
              </p>) }
          </div>
        </Link>
        <Button
          variant="contained"
          data-testid="product-add-to-cart"
          className="btn-adicionar-carrinho"
          id={ id }
          onClick={ saveCartItem }
        >
          Adicionar ao carrinho
        </Button>
        {/* <button
          data-testid="product-add-to-cart"
          type="button"
          id={ id }
          onClick={ saveCartItem }
        >
          Adicionar ao carrinho
        </button> */}
      </div>
    );
  }
}

ListItemCard.propTypes = {
  product: shape({
    id: string,
    title: string,
    thumbnail: string,
    price: number,
    shipping: shape({ free_shipping: bool }),
  }).isRequired,
  saveCartItem: func.isRequired,
};
