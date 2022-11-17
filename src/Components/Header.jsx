import { Search, ShoppingCart } from '@mui/icons-material';
import { Box, InputAdornment, IconButton, ThemeProvider, Badge } from '@mui/material';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../customStyle/images/logo.png';
import { CustomInput } from '../customStyle/CustomHeader';
import Theme from '../customStyle/Theme';

export default class Header extends Component {
  render() {
    const {
      totalItems,
      inputSearch,
      handleChange,
      handleProductsExhibition,
    } = this.props;

    return (
      <ThemeProvider
        theme={ Theme }
      >
        <Box className="Header">
          <div>
            <Link to="/">
              <img src={ logo } alt="logo" />
            </Link>
          </div>
          <div className="header-input">
            <CustomInput
              data-testid="query-input"
              name="inputSearch"
              type="text"
              onChange={ handleChange }
              placeholder="Digite o que você busca"
              id="input-with-icon-adornment"
              value={ inputSearch }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    data-testid="query-button"
                    onClick={ handleProductsExhibition }
                  >
                    <Search
                      color="primary"
                    />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div className="shopping-cart-icon">
            <Link to="/shopping-cart" data-testid="shopping-cart-button">
              <Badge
                data-testid="shopping-cart-size"
                badgeContent={ totalItems }
                color="cinza"
              >
                <ShoppingCart sx={ { fontSize: '35px' } } color="branco" />
              </Badge>
            </Link>
          </div>
        </Box>
      </ThemeProvider>
    );
  }
}

Header.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleProductsExhibition: PropTypes.func.isRequired,
  inputSearch: PropTypes.string.isRequired,
  totalItems: PropTypes.number.isRequired,
};
