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
  { label: 'Column', value: 'column' },
  { label: 'Random', value: 'random' }
];

export const DEFAULT_VISUALIZATION_SORTBY_FILTER =
  VISUALIZATION_SORTBY_FILTERS[0];

/*
   *  Default human appearance parameters
   */
export const HUMAN_VISUAL_SETTINGS = {
  base: {
    radius: 16,
    fontSize: 10,
    radiusToAvatarRatio: 0.8,
    strokeWidth: 1,
    stroke: 'black'
  },
  selected: {
    radius: 32,
    fontSize: 14,
    radiusToAvatarRatio: 0.8,
    strokeWidth: 10,
    stroke: 'purple'
  },
  selectedForDeletion: {
    radius: 32,
    fontSize: 14,
    radiusToAvatarRatio: 0.8,
    strokeWidth: 4,
    stroke: 'red'
  }
};

export const TRANSITION_DURATIONS = {
  enter: 400,
  exit: 300,
  update: 300
};

export const TRANSITION_DELAYS = {
  enter: 10,
  exit: 0,
  update: 0
};

export const VISUALIZATION_MODE_RANDOM = 'random';
export const VISUALIZATION_MODE_METRIC = 'metric';
export const VISUALIZATION_MODE_FORCE = 'force';

export const VISUALIZATION_MODES = [
  VISUALIZATION_MODE_RANDOM,
  VISUALIZATION_MODE_METRIC,
  VISUALIZATION_MODE_FORCE
];
