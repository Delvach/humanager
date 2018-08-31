import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import { openEditHumanModal } from '../actions/navigation';
// import { createHumanAction } from '../actions/humans';

import Button from '@material-ui/core/Button';

const RolesView = ({ createHuman, openHumanEditModal }) => (
  <div>
    <Button variant="contained" color="primary" onClick={createHuman}>
      Create Role
    </Button>
    <Button variant="contained" color="primary" onClick={openHumanEditModal}>
      Open Modal
    </Button>
  </div>
);

// RolesView.propTypes = {
//   roles: PropTypes.array
// };

// RolesView.defaultProps = {
//   roles: []
// };

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
