import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import React, { Component } from 'react';

export default class DetailsReview extends Component {
  render() {
    const {
      handleChange,
      onClickSubmitButton,
      email,
      message,
      isInvalid,
      rateChecked,
    } = this.props;
    return (
      <form>
        <input
          data-testid="product-detail-email"
          type="email"
          placeholder="Email"
          name="email"
          onChange={ handleChange }
          value={ email }
        />
        { rateChecked.map(({ checked }, index) => (
          <label key={ `${index + 1}-rating` } htmlFor={ index + 1 }>
            <input
              data-testid={ `${index + 1}-rating` }
              type="radio"
              name="rate"
              id={ index + 1 }
              value={ index + 1 }
              checked={ checked }
              onChange={ handleChange }
            />
            { index + 1 }
          </label>
        )) }
        <textarea
          data-testid="product-detail-evaluation"
          placeholder="Mensagem (opcional)"
          onChange={ handleChange }
          name="message"
          value={ message }
        />
        <button
          data-testid="submit-review-btn"
          type="button"
          onClick={ onClickSubmitButton }
        >
          Avaliar
        </button>
        { isInvalid && <span data-testid="error-msg">Campos inválidos</span> }
      </form>
    );
  }
}

DetailsReview.propTypes = {
  handleChange: func.isRequired,
  onClickSubmitButton: func.isRequired,
  email: string.isRequired,
  message: string.isRequired,
  isInvalid: bool.isRequired,
  rateChecked: arrayOf(shape({ id: number, checked: bool })).isRequired,
};
