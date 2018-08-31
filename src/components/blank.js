import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';

import { defaultAction } from '../actions/navigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { getStyles } from '../utils/style';

const NewComponent = ({
  myPropertyInComponent,
  performActionInComponent,
  classes
}) => {
  return (
    <MuiThemeProvider>
      <React.Fragment>my contents</React.Fragment>
    </MuiThemeProvider>
  );
};

NewComponent.propTypes = {
  myPropertyInComponent: PropTypes.bool
};

NewComponent.defaultProps = {
  myPropertyInComponent: true
};

const mapStateToProps = ({ state }) => ({
  myPropertyInComponent: state.propertyInState
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      performActionInComponent: defaultAction
    },
    dispatch
  );

const NewComponentWrapped = withStyles(getStyles)(NewComponent);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewComponentWrapped);
