import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddIcon from '@material-ui/icons/PersonAdd';

import { openCreateEditDialogAction } from '../actions/navigation';

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

const HumansView = ({ classes, openCreationDialog }) => (
  <div>
    <Button
      className={classes.fab}
      variant="extendedFab"
      onClick={openCreationDialog}
    >
      <AddIcon className={classes.extendedIcon} />
      Create Human
    </Button>
    <HumanList />
  </div>
);

HumansView.propTypes = {};

HumansView.defaultProps = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { openCreationDialog: openCreateEditDialogAction },
    dispatch
  );

const WrappedHumanView = withStyles(styles)(HumansView);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedHumanView);
