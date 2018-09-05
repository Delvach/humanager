import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

const ReduxFormTextField = ({ label, id, ...props }) => (
  <React.Fragment>
    <Field
      id={id}
      floatingLabelText={label}
      type="text"
      component={TextField}
      {...props}
    />
  </React.Fragment>
);

ReduxFormTextField.propTypes = {
  name: PropTypes.string,
  hintText: PropTypes.string
};

ReduxFormTextField.defaultProps = {
  name: '',
  hintText: ''
};

export default withStyles(styles)(ReduxFormTextField);
