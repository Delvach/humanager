import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

const ReduxFormTextField = ({ name, hintText }) => (
  <Field type="text" name={name} component={TextField} hintText={hintText} />
);

ReduxFormTextField.propTypes = {
  name: PropTypes.string,
  hintText: PropTypes.string
};

ReduxFormTextField.defaultProps = {
  name: '',
  hintText: ''
};

export default ReduxFormTextField;
