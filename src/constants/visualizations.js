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
