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
export const toggleCreateEditDialogStatusAction = (
  open = false,
  id = null
) => ({
  type: ACTIONS.SET_HUMAN_MODAL_STATUS,
  payload: {
    id,
    mode: id === null ? HUMAN_MODAL_MODE_CREATE : HUMAN_MODAL_MODE_EDIT,
    open
  }
});

export const openCreationDialogAction = () => {
  return toggleCreateEditDialogStatusAction(true);
};

export const closeCreationDialogAction = () => {
  return toggleCreateEditDialogStatusAction(false);
};

export const openEditingDialogAction = id => {
  return toggleCreateEditDialogStatusAction(true, id);
};

export const closeEditingDialogAction = () => {
  return toggleCreateEditDialogStatusAction(false);
};

export const setCreateEditDialogModeAction = (
  mode = HUMAN_MODAL_MODE_CREATE
) => ({
  type: ACTIONS.SET_HUMAN_MODAL_MODE,
  payload: {
    mode
  }
});

export const setCreateEditDialogEditIdAction = id => ({
  type: ACTIONS.SET_HUMAN_MODAL_EDIT_ID,
  payload: {
    id
  }
});

export const setCreateEditDialogInitDataAction = human => {
  const { name, email, age } = human;
  return {
    type: ACTIONS.SET_HUMAN_MODAL_INIT_VALUES,
    payload: {
      name,
      email,
      age
    }
  };
};

export const resetCreateEditDialogInitDataAction = human => {
  return {
    type: ACTIONS.RESET_HUMAN_MODAL_INIT_VALUES,
    payload: {}
  };
};

export const setCreateEditDialogOpenStatusAction = open => ({
  type: ACTIONS.SET_HUMAN_MODAL_OPEN_STATUS,
  payload: {
    open
  }
});

// Used for placeholder, prevent tests/type checks from breaking
export const defaultAction = () => {
  return {
    type: ACTIONS.DEFAULT,
    payload: {}
  };
};

export const toggleLeftDrawerAction = (open = false) => ({
  type: ACTIONS.SET_LEFT_DRAWER_OPEN_STATUS,
  payload: { open }
});

export const submitCreateEditDialogAction = ({
  name = '',
  email = '',
  age = ''
}) => {
  return {
    type: ACTIONS.SUBMIT_CREATE_EDIT_DIALOG,
    payload: {
      name,
      email,
      age
    }
  };
};

export const openLeftDrawerAction = () => toggleLeftDrawerAction(true);
export const closeLeftDrawerAction = () => toggleLeftDrawerAction(false);
