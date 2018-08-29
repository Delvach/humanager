import * as ACTIONS from '../constants/actions';
import {
  HUMAN_MODAL_MODE_CREATE,
  HUMAN_MODAL_MODE_EDIT
} from '../constants/humans';

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

export const openCreateHumanModalAction = () => ({
  type: ACTIONS.OPEN_CREATE_HUMAN_MODAL,
  payload: {}
});

// export const openEditHumanModalAction = id => ({
//   type: ACTIONS.OPEN_EDIT_HUMAN_MODAL,
//   payload: {
//     id
//   }
// });

export const closeEditHumanModalAction = () => toggleModal('human', false);

export const submitHumanModalAction = () => {
  return {
    type: ACTIONS.SUBMIT_HUMAN_MODAL,
    payload: {}
  };
};

// Open or close human modal
// Determine whether human modal functions as create or edit by inclusion of ID
export const toggleHumanModalStatusAction = (open = false, id = null) => ({
  type: ACTIONS.SET_HUMAN_MODAL_STATUS,
  payload: {
    id,
    mode: id === null ? HUMAN_MODAL_MODE_CREATE : HUMAN_MODAL_MODE_EDIT,
    open
  }
});

export const setHumanModalModeAction = (mode = HUMAN_MODAL_MODE_CREATE) => ({
  type: ACTIONS.SET_HUMAN_MODAL_MODE,
  payload: {
    mode
  }
});

export const setHumanModalEditIdAction = id => ({
  type: ACTIONS.SET_HUMAN_MODAL_EDIT_ID,
  payload: {
    id
  }
});

export const setHumanModalInitDataAction = human => {
  const { username, email, age } = human;
  return {
    type: ACTIONS.SET_HUMAN_MODAL_INIT_VALUES,
    payload: {
      username,
      email,
      age
    }
  };
};

export const setHumanModalOpenStatusAction = open => ({
  type: ACTIONS.SET_HUMAN_MODAL_OPEN_STATUS,
  payload: {
    open
  }
});
