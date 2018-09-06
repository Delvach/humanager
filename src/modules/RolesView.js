import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddIcon from '@material-ui/icons/GroupAdd';

import { openCreationDialogAction } from '../actions/navigation';

import Button from '../components/inputs/Button';

import HumanList from '../components/HumanList';

const styles = theme => ({
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

const RolesView = ({ classes, openCreationDialog }) => (
  <div>
    <Button
      className={classes.fab}
      variant="extendedFab"
      onClick={() => {
        openCreationDialog('roles');
      }}
    >
      <AddIcon className={classes.extendedIcon} />
      Create Role
    </Button>
    <HumanList />
  </div>
);

RolesView.propTypes = {};

RolesView.defaultProps = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { openCreationDialog: openCreationDialogAction },
    dispatch
  );

const WrappedRolesView = withStyles(styles)(RolesView);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRolesView);
