import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Dialog from '@material-ui/core/Dialog';

import HumanForm from '../forms/HumanForm';

import { closeHumanModalAction } from '../../actions/navigation';

const HumanDialog = ({ humanModalOpen, handleClose }) => {
  return (
    <MuiThemeProvider>
      <Dialog
        disableRestoreFocus
        disableBackdropClick
        open={humanModalOpen}
        onClose={handleClose}
        onEscapeKeyDown={handleClose}
      >
        <HumanForm />
      </Dialog>
    </MuiThemeProvider>
  );
};

HumanDialog.propTypes = {
  createNewHuman: PropTypes.bool,
  humanModalOpen: PropTypes.bool
};

HumanDialog.defaultProps = {
  createNewHuman: true,
  humanModalOpen: false
};

const mapStateToProps = ({ navigation }) => ({
  createNewHuman: navigation.humanModalEditId === null,
  humanModalOpen: navigation.humanModalOpen
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleClose: closeHumanModalAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HumanDialog);
