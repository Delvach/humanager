export const DEFAULT_STATE_HUMANS = [];

export const DEFAULT_STATE_HUMAN = { name: '', email: '', age: '' };

export const DIALOG_MODE_CREATE = 'create';
export const DIALOG_MODE_EDIT = 'edit';

export const HUMAN_ATTRIBUTES = [
  {
    label: 'Name',
    value: 'name'
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
