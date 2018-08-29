import React from 'react';
import { bindActionCreators } from 'redux';

import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { TextField } from 'redux-form-material-ui';
import Button from '@material-ui/core/Button';

import { submitHumanFormAction } from '../../actions/human';

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.age) {
    errors.age = 'Required';
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number';
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old';
  }
  return errors;
};

const warn = values => {
  const warnings = {};
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...';
  }
  return warnings;
};

// Define component
const HumanForm = ({ pristine, handleSubmit, valid }) => (
  <form onSubmit={handleSubmit}>
    <Field type="text" name="username" component={TextField} hintText="Name" />
    <Field type="text" name="email" component={TextField} hintText="Email" />
    <Field type="text" name="age" component={TextField} hintText="Age" />
    <Button disabled={!valid} variant="contained" color="primary" type="submit">
      Click me
    </Button>
    {pristine && <div>Pristine</div>}
  </form>
);

// Wrap component in redux-form for validation
const HumanReduxForm = reduxForm({
  form: 'humanForm',
  validate,
  warn
})(HumanForm);

// Connected redux-form-wrapped component with initialValues mapped
const HumanReduxFormSubmittable = ({ submitHumanForm, initialValues }) => (
  <HumanReduxForm
    initialValues={initialValues}
    onSubmit={values => submitHumanForm(values)}
  />
);

// initialValues populates form when launched
const mapStateToProps = ({ human }) => ({
  initialValues: {
    username: human.username,
    email: human.email,
    age: human.age
  }
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitHumanForm: submitHumanFormAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HumanReduxFormSubmittable);
