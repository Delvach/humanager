import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddPersonIcon from '@material-ui/icons/PersonAdd';
import AddRoleIcon from '@material-ui/icons/GroupAdd';

import { openCreationDialogAction } from '../../actions/navigation';

import Button from '../inputs/Button';

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

const AddIcon = ({ moduleId, ...props }) =>
  moduleId === 'humans' ? (
    <AddPersonIcon {...props} />
  ) : (
    <AddRoleIcon {...props} />
  );

const ModuleView = ({ children, classes, openCreationDialog, moduleId }) => (
  <div>
    <Button
      className={classes.fab}
      variant="extendedFab"
      onClick={() => {
        openCreationDialog(moduleId);
      }}
    >
      <AddIcon className={classes.extendedIcon} />
      Create {moduleId === 'humans' ? 'Human' : 'Role'}
    </Button>
    {children}
  </div>
);

ModuleView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  moduleId: PropTypes.string
};

ModuleView.defaultProps = {
  children: '',
  moduleId: 'humans'
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
