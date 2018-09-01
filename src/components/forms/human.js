import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { reduxForm } from 'redux-form';

import Grid from '@material-ui/core/Grid';

import Button from '../inputs/Button';
import TextField from '../inputs/TextField';

import { submitHumanFormAction } from '../../actions/human';
import { toggleHumanModalStatusAction } from '../../actions/navigation';

import { HUMAN_ATTRIBUTES } from '../../constants/humans';

import {
  validateHuman as validate,
  warnHuman as warn
} from '../../utils/validation';

// Define component
const HumanForm = ({ handleClose, handleSubmit, createNewUser, valid }) => (
  <form onSubmit={handleSubmit}>
    <Grid container spacing={8}>
      {HUMAN_ATTRIBUTES.map(({ label, value }) => (
        <React.Fragment key={value}>
          <Grid item xs={6}>
            {label}
          </Grid>
          <Grid item xs={6}>
            <TextField name={value} hintText={label} />
          </Grid>
        </React.Fragment>
      ))}

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

HumanReduxFormSubmittable.propTypes = {
  createNewUser: PropTypes.bool,
  initialValues: PropTypes.object
};

HumanReduxFormSubmittable.defaultProps = {
  createNewUser: true,
  initialValues: {}
};

// initialValues populates form when launched
const mapStateToProps = ({ human, navigation }) => {
  const { username, email, age } = human;
  return {
    createNewUser: navigation.humanModalEditId === null,
    initialValues: { username, email, age }
  };
};

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
