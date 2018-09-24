export const DEFAULT_STATE_HUMANS = [];

export const DEFAULT_STATE_HUMAN = { name: '', email: '', age: '' };

export const DIALOG_MODE_CREATE = 'create';
export const DIALOG_MODE_EDIT = 'edit';

export const HUMAN_ATTRIBUTES = [
  // {
  //   label: 'Name',
  //   value: 'name',
  //   numeric: false
  // },
  {
    label: 'First Name',
    value: 'nameFirst',
    numeric: false
  },
  {
    label: 'Last Name',
    value: 'nameLast',
    numeric: false
  },
  {
    label: 'Title',
    value: 'title',
    numeric: false
  },
  {
    label: 'Email',
    value: 'email',
    numeric: false
  },
  {
    label: 'Created',
    value: 'created',
    numeric: false
  },
  {
    label: 'Age',
    value: 'age',
    numeric: true
  }
];

export const DEFAULT_HUMAN_ATTRIBUTE = HUMAN_ATTRIBUTES[0].value;

export const HUMAN_LIST_FIELDS = [
  ...HUMAN_ATTRIBUTES
  // {
  //   label: 'ID',
  //   value: 'id'
  // }
];
