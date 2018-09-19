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
  { label: 'Random', value: 'random' },
  { label: 'Name', value: 'name' },
  { label: 'Age', value: 'age' }
];
