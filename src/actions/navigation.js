import * as ACTIONS from '../constants/actions';
import { DIALOG_MODE_CREATE, DIALOG_MODE_EDIT } from '../constants/humans';

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
export const toggleCreateDialogStatusAction = (
  moduleId = 'humans',
  open = false
) => ({
  type: ACTIONS.SET_DIALOG_STATUS,
  payload: {
    mode: DIALOG_MODE_CREATE,
    moduleId,
    open
  }
});

export const toggleEditDialogStatusAction = (
  moduleId = 'humans',
  open = false,
  id = null
) => ({
  type: ACTIONS.SET_DIALOG_STATUS,
  payload: {
    id,
    mode: DIALOG_MODE_EDIT,
    moduleId,
    open
  }
});

export const openCreationDialogAction = (moduleId = 'humans') => {
  return toggleCreateDialogStatusAction(moduleId, true);
};

// export const closeCreationDialogAction = (moduleId = 'humans') => {
//   return toggleCreateDialogStatusAction(moduleId, false);
// };

export const openEditingDialogAction = (moduleId = 'humans', id) => {
  return toggleEditDialogStatusAction(moduleId, true, id);
};

// export const closeEditingDialogAction = (moduleId = 'humans') => {
//   return toggleEditDialogStatusAction(moduleId, false);
// };

export const closeDialogAction = () => ({
  type: ACTIONS.SET_DIALOG_STATUS,
  payload: {
    mode: DIALOG_MODE_CREATE,
    moduleId: null,
    id: null,
    open: false
  }
});

export const setDialogModeAction = (mode = DIALOG_MODE_CREATE) => ({
  type: ACTIONS.SET_DIALOG_MODE,
  payload: {
    mode
  }
});

export const setDialogDatatypeAction = (moduleId = 'humans') => ({
  type: ACTIONS.SET_DIALOG_DATATYPE,
  payload: {
    moduleId
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
    type: ACTIONS.SUBMIT_DIALOG,
    payload: {
      name,
      email,
      age
    }
  };
};

export const openLeftDrawerAction = () => toggleLeftDrawerAction(true);
export const closeLeftDrawerAction = () => toggleLeftDrawerAction(false);
