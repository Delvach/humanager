import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { reduxForm } from 'redux-form';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '../inputs/TextField';

import {
  closeDialogAction,
  submitCreateEditDialogAction
} from '../../actions/navigation';

import { HUMAN_ATTRIBUTES } from '../../constants/humans';

import {
  validateHuman as validate,
  warnHuman as warn
} from '../../utils/validation';

// Define component
const HumanForm = ({
  handleClose,
  handleSubmit,
  createNew,
  valid,
  pristine
}) => (
  <form onSubmit={handleSubmit}>
    <DialogTitle id="form-dialog-title">
      {createNew ? 'Create' : 'Edit'} Human
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        <React.Fragment>
          Please enter {createNew || 'updated '}
          information for your {createNew && 'new '}
          human.
        </React.Fragment>
      </DialogContentText>
      {HUMAN_ATTRIBUTES.map(({ label, value }, index) => (
        <TextField
          key={value}
          autoFocus={index === 0}
          margin="dense"
          name={value}
          label={label}
          fullWidth
        />
      ))}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button color="primary" disabled={pristine || !valid} type="submit">
        {createNew ? 'Create' : 'Update'}
      </Button>
    </DialogActions>
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
  createNew
}) => (
  <HumanReduxForm
    initialValues={initialValues}
    onSubmit={values => submitHumanForm(values)}
    handleClose={handleClose}
    createNew={createNew}
  />
);

HumanReduxFormSubmittable.propTypes = {
  createNew: PropTypes.bool,
  initialValues: PropTypes.object
};

HumanReduxFormSubmittable.defaultProps = {
  createNew: true,
  initialValues: {}
};

// initialValues populates form when launched
const mapStateToProps = ({ human, navigation }) => {
  const { name, email, age } = human;
  return {
    createNew: navigation.humanModalEditId === null,
    initialValues: { name, email, age }
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitHumanForm: submitCreateEditDialogAction,
      handleClose: closeDialogAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HumanReduxFormSubmittable);
