import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleHumanModalStatusAction } from '../actions/navigation';

import Button from '@material-ui/core/Button';

import HumanList from '../components/HumanList';

const HumansView = ({ openCreateHumanModal }) => (
  <div>
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        openCreateHumanModal(true);
      }}
    >
      Create Human
    </Button>
    <HumanList />
  </div>
);

const mapStateToProps = ({ humans }) => ({ humans });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { openCreateHumanModal: toggleHumanModalStatusAction },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HumansView);
