import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

const ReduxFormTextField = ({ ...props }) => (
  <Field type="text" component={TextField} {...props} />
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
