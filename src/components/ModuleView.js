import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddPersonIcon from '@material-ui/icons/PersonAdd';
import AddRoleIcon from '@material-ui/icons/GroupAdd';

import { openCreationDialogAction } from '../actions/navigation';

import Button from '../components/inputs/Button';

import HumanList from '../components/modules/humans/HumansList';

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

const AddIcon = ({ module, ...props }) =>
  module === 'human' ? (
    <AddPersonIcon {...props} />
  ) : (
    <AddRoleIcon {...props} />
  );

const ModuleView = ({ classes, openCreationDialog, module }) => (
  <div>
    <Button
      className={classes.fab}
      variant="extendedFab"
      onClick={openCreationDialog}
    >
      <AddIcon className={classes.extendedIcon} />
      Create {module === 'human' ? 'Human' : 'Role'}
    </Button>
    <HumanList />
  </div>
);

ModuleView.propTypes = {
  module: PropTypes.string
};

ModuleView.defaultProps = {
  module: 'human'
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { openCreationDialog: openCreationDialogAction },
    dispatch
  );

const WrappedModuleView = withStyles(styles)(ModuleView);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedModuleView);
