import * as ACTIONS from '../constants/actions';

export const changeTab = tab => {
  return {
    type: ACTIONS.CHANGE_TAB,
    payload: {
      tab
    }
  };
};

export const toggleModal = (dataType, open, id = null) => {
  return {
    type: ACTIONS.CHANGE_HUMAN_MODAL_STATUS,
    payload: {
      dataType,
      open,
      id,
      isNew: id === null
    }
  };
};

// export const openCreateHumanModalAction = () => toggleModal('human', true);
// export const openEditHumanModalAction = id => toggleModal('human', true, id);
//

export const openCreateHumanModalAction = () => ({
  type: ACTIONS.OPEN_CREATE_HUMAN_MODAL,
  payload: {}
});

export const openEditHumanModalAction = id => ({
  type: ACTIONS.OPEN_EDIT_HUMAN_MODAL,
  payload: {
    id
  }
});

export const closeEditHumanModalAction = () => toggleModal('human', false);

// export const openCreateRoleModal = () => toggleModal('role', true);
// export const openEditRoleModal = () => toggleModal('role', true, false);
// export const closeEditRoleModal = () => toggleModal('role', false);

export const submitHumanModalAction = () => {
  return {
    type: ACTIONS.SUBMIT_HUMAN_MODAL,
    payload: {}
  };
};
