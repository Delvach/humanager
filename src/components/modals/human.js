import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import HumanForm from '../forms/human';

import { closeHumanModalAction } from '../../actions/navigation';

import { getModalStyles, getModalPositionStyle } from '../../utils/style';

const HumanModal = ({
  createNewHuman,
  humanModalOpen,
  handleClose,
  classes
}) => {
  return (
    <MuiThemeProvider>
      <Modal
        disableRestoreFocus
        disableBackdropClick
        open={humanModalOpen}
        onClose={() => {
          handleClose();
        }}
        onEscapeKeyDown={() => {
          handleClose();
        }}
      >
        <Paper style={getModalPositionStyle()} className={classes.paper}>
          <IconButton
            onClick={() => {
              handleClose();
            }}
            style={{
              position: 'absolute',
              right: 10,
              top: 10
            }}
            className={classes.button}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Grid>
            <h2>{createNewHuman ? 'Create' : 'Edit'} Human</h2>
            <HumanForm />
          </Grid>
        </Paper>
      </Modal>
    </MuiThemeProvider>
  );
};

HumanModal.propTypes = {
  createNewHuman: PropTypes.bool,
  humanModalOpen: PropTypes.bool
};

HumanModal.defaultProps = {
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

const ModalWrapped = withStyles(getModalStyles)(HumanModal);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWrapped);
