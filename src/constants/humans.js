// Human template state tree
export const DEFAULT_HUMAN = {
  id: null,
  name: {
    last: 'Last',
    first: 'First'
  }
};

export const DEFAULT_STATE_HUMANS = [];

export const DEFAULT_HUMAN_FIELD = {
  value: '',
  valid: false
};

export const DEFAULT_STATE_HUMAN = { name: '', email: '', age: '' };

export const HUMAN_MODAL_MODE_CREATE = 'create';
export const HUMAN_MODAL_MODE_EDIT = 'edit';

export const DEFAULT_STATE_NAVIGATION = {
  humanModalOpen: false,
  humanModalMode: HUMAN_MODAL_MODE_CREATE,
  humanModalEditId: null,
  tab: 0
};

export const HUMAN_NAME = 'name';
