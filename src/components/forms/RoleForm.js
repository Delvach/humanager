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
  { name: 'Alpha', id: 0 },
  { name: 'Beta', id: 1 },
  { name: 'Charlie', id: 2 },
  { name: 'Delta', id: 3 },
  { name: 'Echo', id: 4 },
  { name: 'Foxtrot', id: 5 },
  { name: 'Gamma', id: 6 }
];

const memberHumanIds = [1, 3, 4];

const handleMultiselectChange = event => {
  const toggledValue = event.target.value[event.target.value.length - 1];
  const isAlreadySelected = memberHumanIds.indexOf(toggledValue) > -1;
  if (!isAlreadySelected) memberHumanIds.push(toggledValue);
};

// Define component
const RoleForm = ({ handleClose, handleSubmit, createNew, valid }) => (
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

      <TextField autoFocus margin="dense" name="name" label="Name" fullWidth />

      <MultiSelect
        name="members"
        label="Member Humans"
        items={rawHumans}
        memberIds={memberHumanIds}
        onChange={handleMultiselectChange}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button color="primary" disabled={!valid} type="submit">
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
  const { name, members } = role;
  return {
    createNew: navigation.roleModalEditId === null,
    initialValues: { name, members },
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
