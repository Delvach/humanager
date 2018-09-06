import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Dialog from '@material-ui/core/Dialog';

import HumanForm from '../forms/HumanForm';

import { closeCreationDialogAction } from '../../actions/navigation';

const DialogForm = ({ open, handleClose }) => {
  return (
    <MuiThemeProvider>
      <Dialog
        disableRestoreFocus
        disableBackdropClick
        open={open}
        onClose={handleClose}
        onEscapeKeyDown={handleClose}
      >
        <HumanForm />
      </Dialog>
    </MuiThemeProvider>
  );
};

DialogForm.propTypes = {
  open: PropTypes.bool
};

DialogForm.defaultProps = {
  open: false
};

const mapStateToProps = ({ navigation }) => ({
  open: navigation.humanModalOpen
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleClose: closeCreationDialogAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogForm);
