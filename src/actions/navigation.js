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

export const closeHumanModalAction = () => {
  return toggleHumanModalStatusAction(false);
};

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

export const resetHumanModalInitDataAction = human => {
  return {
    type: ACTIONS.RESET_HUMAN_MODAL_INIT_VALUES,
    payload: {}
  };
};

export const setHumanModalOpenStatusAction = open => ({
  type: ACTIONS.SET_HUMAN_MODAL_OPEN_STATUS,
  payload: {
    open
  }
});

// Human form submission
export const submitHumanModalAction = () => {
  return {
    type: ACTIONS.SUBMIT_HUMAN_MODAL,
    payload: {}
  };
};
