import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = theme => ({
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: '150px'
  }
});

const ModuleView = ({ children }) => (
  <div
    style={{
      overflowX: 'hide',
      overflowY: 'auto',
      flexGrow: 1,
      display: 'flex'
    }}
  >
    {children}
  </div>
);

ModuleView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ])
  // moduleId: PropTypes.string
};

ModuleView.defaultProps = {
  children: ''
  // moduleId: 'humans'
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const WrappedModuleView = withStyles(styles)(ModuleView);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedModuleView);
