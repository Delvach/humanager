import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// import Paper from '@material-ui/core/Paper';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControlLabel from '@material-ui/core/FormControlLabel';

import TextField from '@material-ui/core/TextField';

import {
  closeEditHumanModalAction,
  submitHumanModalAction
} from '../actions/navigation';
import { validateNameAction } from '../actions/validation';

import { HUMAN_NAME } from '../constants/humans';

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

const UserModal = ({
  editHumanModalOpen,
  handleClose,
  humanIsNew,
  humanName,
  nameIsValid,
  submitCreateHuman,
  validateName,
  classes
}) => {
  const handleValidation = name => event => {
    switch (name) {
      case HUMAN_NAME:
      default:
        validateName(event.target.value);
        break;
    }
  };
  const handleSubmission = event => {
    submitCreateHuman();
  };
  return (
    <Modal open={editHumanModalOpen} onClose={handleClose}>
      <div style={getModalStyle()} className={classes.paper}>
        <Grid>
          <h2>Title</h2>
          <form>
            <TextField
              onChange={handleValidation(HUMAN_NAME)}
              required
              id="name"
              label="Name"
              margin="normal"
              value={humanName || ''}
            />
            <Button
              disabled={!nameIsValid}
              variant="contained"
              color="primary"
              onClick={handleSubmission}
            >
              {humanIsNew ? 'Create' : 'Update'}
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Cancel
            </Button>
          </form>
        </Grid>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ navigation, human }) => ({
  editHumanModalOpen: navigation.editHumanModalOpen,
  humanIsNew: human.isNew,
  humanName: human.name.value,
  nameIsValid: human.name.valid
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => dispatch(closeEditHumanModalAction()),
  submitCreateHuman: () => dispatch(submitHumanModalAction()),
  validateName: (name = null) => dispatch(validateNameAction(name))
});

const ModalWrapped = withStyles(styles)(UserModal);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWrapped);
