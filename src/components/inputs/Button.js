import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

const FormattedButton = ({ classes, children, ...props }) => (
  <Button aria-label={children} className={classes.button} {...props}>
    {children}
  </Button>
);

FormattedButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
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
  variant: 'text'
};

export default withStyles(styles)(FormattedButton);
