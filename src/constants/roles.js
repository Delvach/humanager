export const DEFAULT_STATE_ROLES = [];

export const DEFAULT_STATE_ROLE = { name: '', members: [] };

export const ROLE_MODAL_MODE_CREATE = 'create';
export const ROLE_MODAL_MODE_EDIT = 'edit';

export const ROLE_ATTRIBUTES = [
  {
    label: 'Name',
    value: 'name',
    numeric: false
  },
  {
    label: 'Members',
    value: 'members',
    numeric: false
  },
  {
    label: 'Created',
    value: 'created',
    numeric: false
  }
];

export const DEFAULT_ROLE_ATTRIBUTE = ROLE_ATTRIBUTES[0].value;

export const ROLE_LIST_FIELDS = [
  ...ROLE_ATTRIBUTES
  // {
  //   label: 'ID',
  //   value: 'id'
  // }
];
