import React from 'react';
import { connect } from 'react-redux';

import { openCreateHumanModalAction } from '../actions/navigation';

import Button from '@material-ui/core/Button';

import HumanList from '../components/HumanList';

const HumansView = ({ openCreateHumanModal }) => (
  <div>
    <Button variant="contained" color="primary" onClick={openCreateHumanModal}>
      Open Modal
    </Button>
    <HumanList />
  </div>
);

const mapStateToProps = ({ humans }) => ({ humans });

const mapDispatchToProps = dispatch => ({
  openCreateHumanModal: () => dispatch(openCreateHumanModalAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HumansView);
