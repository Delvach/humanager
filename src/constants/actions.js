// Used for blank template, does nothing
export const DEFAULT = 'DEFAULT';

// User (pending) authentication
export const SET_USER_UID = 'SET_USER_UID';

export const TEST = 'TEST';
export const TEST_OUTPUT = 'TEST_OUTPUT';

export const SELECT_VISUALIZATION_ITEM = 'SELECT_VISUALIZATION_ITEM';
export const RESET_VISUALIZATION_ITEM = 'RESET_VISUALIZATION_ITEM';

// export const STORE_VISUALIZATION_POSITIONS = 'STORE_VISUALIZATION_POSITIONS';
export const STORE_VISUALIZATION_ITEMS_POSITIONS =
  'STORE_VISUALIZATION_ITEMS_POSITIONS';
export const RANDOMIZE_VISUALIZATION_POSITIONS =
  'RANDOMIZE_VISUALIZATION_POSITIONS';

export const DELETE_VISUALIZATION_ITEMS_POSITIONS =
  'DELETE_VISUALIZATION_ITEMS_POSITIONS';

export const SET_VISUALIZATION_FILTER_SORTBY =
  'SET_VISUALIZATION_FILTER_SORTBY';

export const SET_VISUALIZATION_BEHAVIOR = 'SET_VISUALIZATION_BEHAVIOR';

// Application
export const INITIALIZE_APP = 'INITIALIZE_APP';
export const SET_PREFERENCES = 'SET_PREFERENCES';
export const NOTIFY_SET_PREFERENCES = 'NOTIFY_SET_PREFERENCES';
export const API_ERROR = 'API_ERROR';

export const SET_NAVIGATION_FROM_PREFS = 'SET_NAVIGATION_FROM_PREFS';

export const LOAD_PREFERENCES = 'LOAD_PREFERENCES';
export const STORE_PREFERENCE = 'STORE_PREFERENCE';

// Group actions
export const LOAD_HUMANS = 'LOAD_HUMANS';
export const LOAD_ROLES = 'LOAD_ROLES';

export const DELETE_HUMANS = 'DELETE_HUMANS';
export const DELETE_ROLES = 'DELETE_ROLES';

// Group actions - notifications
export const HUMANS_LOADED = 'HUMANS_LOADED';
export const ROLES_LOADED = 'ROLES_LOADED';

// Individual actions
export const DELETE_HUMAN = 'DELETE_HUMAN';
export const LOAD_HUMAN = 'LOAD_HUMAN';

export const DELETE_ROLE = 'DELETE_ROLE';
export const LOAD_ROLE = 'LOAD_ROLE';
export const UPDATE_ROLE = 'UPDATE_ROLE';

// Individual actions - notifications
export const HUMAN_CREATED = 'HUMAN_CREATED';
export const HUMAN_DELETED = 'HUMAN_DELETED';
export const HUMAN_LOADED = 'HUMAN_LOADED';
export const HUMAN_UPDATED = 'HUMAN_UPDATED';

export const ROLE_CREATED = 'ROLE_CREATED';
export const ROLE_DELETED = 'ROLE_DELETED';
export const ROLE_LOADED = 'ROLE_LOADED';
export const ROLE_UPDATED = 'ROLE_UPDATED';

// Navigation
export const TRIGGER_TAB_CHANGE = 'TRIGGER_TAB_CHANGE';
export const CHANGE_TAB = 'CHANGE_TAB';

// Common dialog (human/role)
export const SUBMIT_HUMAN_DIALOG = 'SUBMIT_HUMAN_DIALOG';
export const SUBMIT_ROLE_DIALOG = 'SUBMIT_ROLE_DIALOG';
export const SET_DIALOG_STATUS = 'SET_DIALOG_STATUS';
export const SET_DIALOG_MODE = 'SET_DIALOG_MODE';
export const SET_DIALOG_DATATYPE = 'SET_DIALOG_DATATYPE';

// Human modal

export const SET_HUMAN_MODAL_EDIT_ID = 'SET_HUMAN_MODAL_EDIT_ID';
export const SET_HUMAN_MODAL_OPEN_STATUS = 'SET_HUMAN_MODAL_OPEN_STATUS';
export const SET_HUMAN_MODAL_INIT_VALUES = 'SET_HUMAN_MODAL_INIT_VALUES';
export const RESET_HUMAN_MODAL_INIT_VALUES = 'RESET_HUMAN_MODAL_INIT_VALUES';

// Role modal

export const SET_ROLE_MODAL_EDIT_ID = 'SET_ROLE_MODAL_EDIT_ID';
export const SET_ROLE_MODAL_OPEN_STATUS = 'SET_ROLE_MODAL_OPEN_STATUS';
export const SET_ROLE_MODAL_INIT_VALUES = 'SET_ROLE_MODAL_INIT_VALUES';
export const RESET_ROLE_MODAL_INIT_VALUES = 'RESET_ROLE_MODAL_INIT_VALUES';

// Left drawer
export const SET_LEFT_DRAWER_OPEN_STATUS = 'SET_LEFT_DRAWER_OPEN_STATUS';

// Resizeable pane
export const HANDLE_TOP_PANE_RESIZE = 'HANDLE_TOP_PANE_RESIZE';

export const SET_VISUAL_CONTAINER_SIZE = 'SET_VISUAL_CONTAINER_SIZE';

export const AUTO_GENERATE_FAUX_HUMANS = 'AUTO_GENERATE_FAUX_HUMANS';

// Start resize event, change boolean in mappped prop to trigger component update
export const TRIGGER_VISUALIZATION_RESIZE = 'TRIGGER_VISUALIZATION_RESIZE';

// After
export const TOGGLE_VISUALIZATION_RESIZE_FLAG =
  'TOGGLE_VISUALIZATION_RESIZE_FLAG';
export const COMPLETE_VISUALIZATION_RESIZE = 'COMPLETE_VISUALIZATION_RESIZE';

export const LIST_SELECT_ALL = 'LIST_SELECT_ALL';
export const CHANGE_LIST_SORT = 'CHANGE_LIST_SORT';
export const SET_LIST_SORT = 'SET_LIST_SORT';

export const TOGGLE_LIST_ITEM_SELECTION = 'TOGGLE_LIST_ITEM_SELECTION';

export const SET_SELECTED_LIST_ITEMS = 'SET_SELECTED_LIST_ITEMS';
export const RESET_SELECTED_LIST_ITEMS = 'RESET_SELECTED_LIST_ITEMS';
export const DELETE_SELECTED_LIST_ITEMS = 'DELETE_SELECTED_LIST_ITEMS';
