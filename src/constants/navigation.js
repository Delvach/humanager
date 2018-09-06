// Navigation
export const TABS = [
  {
    value: 0,
    title: 'Humans'
  },
  {
    value: 1,
    title: 'Roles'
  }
];

export const DEFAULT_STATE_NAVIGATION = {
  humanModalOpen: false,
  humanModalEditId: null,
  roleModalOpen: false,
  roleModalEditId: null,
  leftDrawerOpen: true,
  tab: 0
};

export const HUMAN_EDIT_MODAL_OPEN_STATUS = 'HUMAN_EDIT_MODAL_OPEN_STATUS';
