import React from 'react';
import { bindActionCreators } from 'redux';

import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { TextField } from 'redux-form-material-ui';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { submitHumanFormAction } from '../../actions/human';
import { toggleHumanModalStatusAction } from '../../actions/navigation';

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
const HumanForm = ({ handleClose, handleSubmit, createNewUser, valid }) => (
  <form onSubmit={handleSubmit}>
    <Grid container spacing={8}>
      <Grid item xs={6}>
        Username
      </Grid>
      <Grid item xs={6}>
        <Field
          type="text"
          label="Username"
          name="username"
          component={TextField}
          hintText="Username"
        />
      </Grid>

      <Grid item xs={6}>
        Email
      </Grid>
      <Grid item xs={6}>
        <Field
          type="text"
          name="email"
          component={TextField}
          hintText="Email"
        />
      </Grid>

      <Grid item xs={6}>
        Age
      </Grid>
      <Grid item xs={6}>
        <Field type="text" name="age" component={TextField} hintText="Age" />
      </Grid>

      <Grid item xs={12}>
        <Grid container justify="flex-end" spacing={8}>
          <Grid item xs={3}>
            <Button
              disabled={!valid}
              variant="contained"
              color="primary"
              type="submit"
            >
              {createNewUser ? 'Create' : 'Update'}
            </Button>
          </Grid>

          <Grid item xs={3}>
            <Button onClick={handleClose} variant="contained" color="primary">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </form>
);

// Wrap component in redux-form for validation
const HumanReduxForm = reduxForm({
  form: 'humanForm',
  validate,
  warn
})(HumanForm);

// Connected redux-form-wrapped component with initialValues mapped
const HumanReduxFormSubmittable = ({
  submitHumanForm,
  handleClose,
  initialValues,
  createNewUser
}) => (
  <HumanReduxForm
    initialValues={initialValues}
    onSubmit={values => submitHumanForm(values)}
    handleClose={() => {
      handleClose(false);
    }}
    createNewUser={createNewUser}
  />
);

// initialValues populates form when launched
const mapStateToProps = ({ human, navigation }) => ({
  createNewUser: navigation.humanModalEditId === null,
  initialValues: {
    username: human.username,
    email: human.email,
    age: human.age
  }
});

//navigation.humanModalEditId === null
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitHumanForm: submitHumanFormAction,
      handleClose: toggleHumanModalStatusAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HumanReduxFormSubmittable);
