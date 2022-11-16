import { func, string } from 'prop-types';
import React, { Component } from 'react';

export default class CategoryRadio extends Component {
  render() {
    const { name, id, handleProductsExhibition, handleChange } = this.props;
    return (
      <label
        htmlFor={ id }
        data-testid="category"
      >
        <input
          type="radio"
          name="category"
          id={ id }
          value={ id }
          onChange={ (event) => (
            handleChange(event, handleProductsExhibition)
          ) }
        />
        { name }
      </label>
    );
  }
}

CategoryRadio.propTypes = {
  name: string.isRequired,
  id: string.isRequired,
  handleProductsExhibition: func.isRequired,
  handleChange: func.isRequired,
};
