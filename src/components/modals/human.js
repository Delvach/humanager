import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';

// import Paper from '@material-ui/core/Paper';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import TextField from '@material-ui/core/TextField';

import HumanForm from '../forms/human';

import { toggleHumanModalStatusAction } from '../../actions/navigation';

const getModalStyle = (top = 50, left = 50) => ({
  top: `${top}%`,
  left: `${left}%`,
  transform: `translate(-${top}%, -${left}%)`
});

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

const UserModal = ({ humanModalOpen, handleClose, classes }) => {
  return (
    <Modal
      open={humanModalOpen}
      onClose={() => {
        handleClose(false);
      }}
    >
      <div style={getModalStyle()} className={classes.paper}>
        <Grid>
          <h2>Title</h2>
          <HumanForm />
        </Grid>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ navigation }) => ({
  humanModalOpen: navigation.humanModalOpen
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleClose: toggleHumanModalStatusAction
    },
    dispatch
  );

const ModalWrapped = withStyles(styles)(UserModal);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWrapped);
