import * as ACTIONS from '../constants/actions';
import { DIALOG_MODE_CREATE, DIALOG_MODE_EDIT } from '../constants/humans';

import { normalizeRoleData } from '../utils/roles';

export const changeTabAction = tab => {
  return {
    type: ACTIONS.CHANGE_TAB,
    payload: {
      tab
    }
  };
};

//SET_NAVIGATION_FROM_PREFS
export const setNavigationFromPreferencesAction = (
  tab,
  leftDrawerOpen,
  topPaneHeight
) => {
  return {
    type: ACTIONS.SET_NAVIGATION_FROM_PREFS,
    payload: {
      tab,
      leftDrawerOpen,
      topPaneHeight
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

export const openEditingDialogAction = (moduleId = 'humans', id) => {
  return toggleEditDialogStatusAction(moduleId, true, id);
};

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

export const setDialogEditIdAction = (id, moduleId) => ({
  type:
    moduleId === 'humans'
      ? ACTIONS.SET_HUMAN_MODAL_EDIT_ID
      : ACTIONS.SET_ROLE_MODAL_EDIT_ID,
  payload: {
    id
  }
});

export const setHumanEditingDialogAction = human => {
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

export const setRoleEditingDialogAction = role => {
  const { name, members } = role;
  return {
    type: ACTIONS.SET_ROLE_MODAL_INIT_VALUES,
    payload: {
      name,
      members
    }
  };
};

export const resetHumanEditingDialogInitDataAction = () => ({
  type: ACTIONS.RESET_HUMAN_MODAL_INIT_VALUES,
  payload: {}
});

export const resetRoleEditingDialogInitDataAction = () => ({
  type: ACTIONS.RESET_ROLE_MODAL_INIT_VALUES,
  payload: {}
});

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

export const submitHumanDialogAction = ({
  name = '',
  email = '',
  age = ''
}) => {
  return {
    type: ACTIONS.SUBMIT_HUMAN_DIALOG,
    payload: {
      name,
      email,
      age
    }
  };
};

export const submitRoleDialogAction = ({ name = '', members = [] }) => {
  return {
    type: ACTIONS.SUBMIT_ROLE_DIALOG,
    payload: normalizeRoleData(name, members)
  };
};

export const openLeftDrawerAction = () => toggleLeftDrawerAction(true);
export const closeLeftDrawerAction = () => toggleLeftDrawerAction(false);

export const resizeHandlerAction = size => ({
  type: ACTIONS.HANDLE_TOP_PANE_RESIZE,
  payload: { size }
});
