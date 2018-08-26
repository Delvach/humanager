import React from 'react';
// import { connect } from 'react-redux';

// import { openEditHumanModal } from '../actions/navigation';
// import { createHumanAction } from '../actions/humans';

import Button from '@material-ui/core/Button';

const RolesView = ({ createHuman, openHumanEditModal }) => (
  <div>
    <Button variant="contained" color="primary" onClick={createHuman}>
      New Human
    </Button>
    <Button variant="contained" color="primary" onClick={openHumanEditModal}>
      Open Modal
    </Button>
  </div>
);

// const mapStateToProps = ({ humans }) => ({ humans });

// const mapDispatchToProps = dispatch => ({
//   createHuman: ({ name = 'shocker' }) => dispatch(createHumanAction(name)),
//   openHumanEditModal: () => dispatch(openEditHumanModal())
// });

export default RolesView;
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(RolesView);
