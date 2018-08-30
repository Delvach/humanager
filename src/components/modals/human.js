import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import HumanForm from '../forms/human';

import { closeHumanModalAction } from '../../actions/navigation';

const getModalStyle = (top = 50, left = 50) => ({
  top: `${top}%`,
  left: `${left}%`,
  transform: `translate(-${top}%, -${left}%)`
});

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

const UserModal = ({ createNewUser, humanModalOpen, handleClose, classes }) => {
  return (
    <Modal
      disableBackdropClick
      open={humanModalOpen}
      onClose={() => {
        handleClose();
      }}
      onEscapeKeyDown={() => {
        handleClose();
      }}
    >
      <div style={getModalStyle()} className={classes.paper}>
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
          <h2>{createNewUser ? 'Create' : 'Edit'} User</h2>
          <HumanForm />
        </Grid>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ navigation }) => ({
  createNewUser: navigation.humanModalEditId === null,
  humanModalOpen: navigation.humanModalOpen
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleClose: closeHumanModalAction
    },
    dispatch
  );

const ModalWrapped = withStyles(styles)(UserModal);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWrapped);
