export const DEFAULT_STATE_VISUALIZATIONS = {
  height: 100,
  width: 100,
  selectedItemId: null,
  itemsPositions: {},
  itemSizeBase: 32,
  itemSizeActive: 48,
  sortBy: 'random'
};

export const VISUALIZATION_SORTBY_FILTERS = [
  { label: 'Name', value: 'name' },
  { label: 'Age', value: 'age' },
  { label: 'Color', value: 'color' },
  { label: 'Random', value: 'random' }
];

export const DEFAULT_VISUALIZATION_SORTBY_FILTER =
  VISUALIZATION_SORTBY_FILTERS[0];

/*
   *  Default human appearance parameters
   */
export const HUMAN_VISUAL_SETTINGS = {
  base: {
    radius: 32,
    fontSize: 14,
    radiusToAvatarRatio: 0.8,
    strokeWidth: 1,
    strokeColor: 'black'
  },
  selected: {
    radius: 64,
    fontSize: 28,
    radiusToAvatarRatio: 0.8,
    strokeWidth: 3,
    strokeColor: 'black'
  },
  selectedForDeletion: {
    radius: 32,
    fontSize: 14,
    radiusToAvatarRatio: 0.8,
    strokeWidth: 4,
    strokeColor: 'red'
  }
};

export const TRANSITION_DURATIONS = {
  enter: 750,
  exit: 300,
  update: 500
};
