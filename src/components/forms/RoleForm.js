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
  submitCreateEditDialogAction
} from '../../actions/navigation';

import {
  validateRole as validate,
  warnRole as warn
} from '../../utils/validation';

const rawHumans = [
  { text: 'Alpha', value: 0 },
  { text: 'Beta', value: 1 },
  { text: 'Charlie', value: 2 },
  { text: 'Delta', value: 3 },
  { text: 'Echo', value: 4 },
  { text: 'Foxtrot', value: 5 },
  { text: 'Gamma', value: 6 }
];

const memberHumanIds = [1, 3, 4];

// Define component
const RoleForm = ({
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
    <DialogContent>
      <DialogContentText>
        <React.Fragment>
          Please enter {createNew || 'updated '}
          information for your {createNew && 'new '}
          role.
        </React.Fragment>
      </DialogContentText>

      <TextField
        autoFocus
        margin="dense"
        name="title"
        label="Title"
        fullWidth
      />
      <TextField autoFocus margin="dense" name="name" label="Name" fullWidth />
      <MultiSelect name="members" data={rawHumans} />
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
  submitRoleForm,
  handleClose,
  initialValues,
  createNew,
  humans
}) => (
  <RoleReduxForm
    initialValues={initialValues}
    onSubmit={values => submitRoleForm(values)}
    handleClose={handleClose}
    createNew={createNew}
    humans={humans}
  />
);

RoleReduxFormSubmittable.propTypes = {
  createNew: PropTypes.bool,
  initialValues: PropTypes.object,
  humans: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  members: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

RoleReduxFormSubmittable.defaultProps = {
  createNew: true,
  initialValues: {},
  humans: [],
  members: []
};

// initialValues populates form when launched
const mapStateToProps = ({ role, navigation, humans }) => {
  const { name } = role;
  return {
    createNew: navigation.roleModalEditId === null,
    initialValues: { name, members: memberHumanIds, title: '' },
    humans
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitRoleForm: submitCreateEditDialogAction,
      handleClose: closeDialogAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleReduxFormSubmittable);
