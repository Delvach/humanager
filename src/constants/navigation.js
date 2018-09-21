// Navigation
export const TABS = [
  {
    value: 0,
    title: 'Humans'
  },
  {
    value: 1,
    title: 'Roles'
  },
  {
    value: 2,
    title: 'About'
  }
];

export const DEFAULT_STATE_NAVIGATION = {
  dialogDatatype: 'humans',
  humanModalOpen: false,
  humanModalEditId: null,
  roleModalOpen: false,
  roleModalEditId: null,
  leftDrawerOpen: true,
  tab: 0,
  triggerVisualizationResize: false,
  listItemsSelected: [],
  sortBy: 'nameFirst',
  sortByDirection: 'asc'
};

export const HUMAN_EDIT_MODAL_OPEN_STATUS = 'HUMAN_EDIT_MODAL_OPEN_STATUS';

export const TABLE_SORT_ASCENDING = 'asc';
export const TABLE_SORT_DESCENDING = 'desc';
