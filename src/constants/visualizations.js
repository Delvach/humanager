export const DEFAULT_STATE_VISUALIZATIONS = {
  height: 100,
  width: 100,
  bit: true,
  selectedItemId: null,
  // positions: {
  //   // kill me
  //   humans: [],
  //   roles: []
  // },
  itemsPositions: {},
  itemSizeBase: 32,
  itemSizeActive: 48,
  sortBy: 'random'
};

export const VISUALIZATION_SORTBY_FILTERS = [
  { label: 'Name', value: 'name' },
  { label: 'Age', value: 'age' },
  { label: 'Random', value: 'random' }
];

export const DEFAULT_VISUALIZATION_SORTBY_FILTER =
  VISUALIZATION_SORTBY_FILTERS[0];
