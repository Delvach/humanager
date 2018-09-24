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

import MultiSelect from '../inputs/MultiSelect';

import {
  closeDialogAction,
  submitRoleDialogAction
} from '../../actions/navigation';

import { normalizeHumansDataForSelect } from '../../utils/humans';

import {
  validateRole as validate,
  warnRole as warn
} from '../../utils/validation';

// Define component
const RoleForm = ({
  allHumans,
  handleClose,
  handleSubmit,
  createNew,
  valid,
  pristine
}) => (
  <form onSubmit={handleSubmit}>
    <DialogTitle id="form-dialog-title">
      {createNew ? 'Create' : 'Edit'} Role
    </DialogTitle>
    <DialogContent style={{ minHeight: 400 }}>
      <DialogContentText>
        <React.Fragment>
          Please enter {createNew || 'updated '}
          information for your {createNew && 'new '}
          role.
        </React.Fragment>
      </DialogContentText>

      <TextField autoFocus margin="dense" name="name" label="Name" fullWidth />
      <MultiSelect name="members" data={allHumans} />
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
const RoleReduxForm = reduxForm({
  form: 'roleForm',
  validate,
  warn
})(RoleForm);

// Connected redux-form-wrapped component with initialValues mapped
const RoleReduxFormSubmittable = ({
  allHumans,
  submitRoleForm,
  handleClose,
  initialValues,
  createNew
}) => (
  <RoleReduxForm
    initialValues={initialValues}
    onSubmit={values => submitRoleForm(values)}
    handleClose={handleClose}
    createNew={createNew}
    allHumans={allHumans}
  />
);

RoleReduxFormSubmittable.propTypes = {
  allHumans: PropTypes.array,
  createNew: PropTypes.bool,
  initialValues: PropTypes.object,
  humans: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  members: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

RoleReduxFormSubmittable.defaultProps = {
  allHumans: [],
  createNew: true,
  initialValues: {},
  humans: [],
  members: []
};

// initialValues populates form when launched
const mapStateToProps = ({ role, navigation, humans }) => {
  const { name, members } = role;
  return {
    createNew: navigation.roleModalEditId === null,
    initialValues: { name, members },
    allHumans: normalizeHumansDataForSelect(humans)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitRoleForm: submitRoleDialogAction,
      handleClose: closeDialogAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleReduxFormSubmittable);
