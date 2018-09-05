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
// import Button from '../inputs/Button';
import TextField from '../inputs/TextField';

import { submitHumanFormAction } from '../../actions/human';
import { closeHumanModalAction } from '../../actions/navigation';

import { HUMAN_ATTRIBUTES } from '../../constants/humans';

import {
  validateHuman as validate,
  warnHuman as warn
} from '../../utils/validation';

// Define component
const HumanForm = ({ handleClose, handleSubmit, createNewHuman, valid }) => (
  <form onSubmit={handleSubmit}>
    <DialogTitle id="form-dialog-title">
      {createNewHuman ? 'Create' : 'Edit'} Human
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        <React.Fragment>
          Please enter {createNewHuman || 'updated '}
          information for your {createNewHuman && 'new '}
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
      <Button
        onClick={handleClose}
        color="primary"
        disabled={!valid}
        type="submit"
      >
        {createNewHuman ? 'Create' : 'Update'}
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
  createNewHuman
}) => (
  <HumanReduxForm
    initialValues={initialValues}
    onSubmit={values => submitHumanForm(values)}
    handleClose={handleClose}
    createNewHuman={createNewHuman}
  />
);

HumanReduxFormSubmittable.propTypes = {
  createNewHuman: PropTypes.bool,
  initialValues: PropTypes.object
};

HumanReduxFormSubmittable.defaultProps = {
  createNewHuman: true,
  initialValues: {}
};

// initialValues populates form when launched
const mapStateToProps = ({ human, navigation }) => {
  const { username, email, age } = human;
  return {
    createNewHuman: navigation.humanModalEditId === null,
    initialValues: { username, email, age }
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitHumanForm: submitHumanFormAction,
      handleClose: closeHumanModalAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HumanReduxFormSubmittable);
