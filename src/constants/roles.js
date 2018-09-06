export const DEFAULT_STATE_ROLES = [];

export const DEFAULT_STATE_ROLE = { name: '', members: [] };

export const ROLE_MODAL_MODE_CREATE = 'create';
export const ROLE_MODAL_MODE_EDIT = 'edit';

export const ROLE_ATTRIBUTES = [
  {
    label: 'Name',
    value: 'name'
  },
  {
    label: 'Members',
    value: 'members'
  }
];

export const ROLE_LIST_FIELDS = [
  ...ROLE_ATTRIBUTES,
  {
    label: 'ID',
    value: 'id'
  }
];
