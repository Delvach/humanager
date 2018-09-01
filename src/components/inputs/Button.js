import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const FormattedButton = ({ children, ...props }) => (
  <Button {...props}>{children}</Button>
);

FormattedButton.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  variant: PropTypes.string
};

FormattedButton.defaultProps = {
  children: '',
  color: 'primary',
  disabled: false,
  onClick: () => {},
  type: 'button',
  variant: 'contained'
};

export default FormattedButton;
