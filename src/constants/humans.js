export const DEFAULT_STATE_HUMANS = [];

export const DEFAULT_STATE_HUMAN = { username: '', email: '', age: '' };

export const HUMAN_MODAL_MODE_CREATE = 'create';
export const HUMAN_MODAL_MODE_EDIT = 'edit';

export const HUMAN_ATTRIBUTES = [
  {
    label: 'Username',
    value: 'username'
  },
  {
    label: 'Email',
    value: 'email'
  },
  {
    label: 'Age',
    value: 'age'
  }
];

export const HUMAN_LIST_FIELDS = [
  ...HUMAN_ATTRIBUTES,
  {
    label: 'ID',
    value: 'id'
  }
];
