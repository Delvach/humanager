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

export const DEFAULT_STATE_HUMAN = {
  name: { ...DEFAULT_HUMAN_FIELD },
  nickname: { ...DEFAULT_HUMAN_FIELD },
  isNew: true
};

export const DEFAULT_STATE_NAVIGATION = {
  editHumanModalOpen: false,
  tab: 0
};

export const HUMAN_NAME = 'name';
