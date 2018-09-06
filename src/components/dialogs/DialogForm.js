import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Dialog from '@material-ui/core/Dialog';

import HumanForm from '../forms/HumanForm';
import RoleForm from '../forms/RoleForm';

import { closeDialogAction } from '../../actions/navigation';

const DialogForm = ({ open, handleClose, datatype }) => {
  return (
    <MuiThemeProvider>
      <Dialog
        disableRestoreFocus
        disableBackdropClick
        open={open}
        onClose={handleClose}
        onEscapeKeyDown={handleClose}
      >
        {datatype === 'humans' ? <HumanForm /> : <RoleForm />}
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
  open: navigation.humanModalOpen,
  datatype: navigation.dialogDatatype
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleClose: closeDialogAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogForm);
