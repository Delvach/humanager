import * as d3 from 'd3';
/*
 * Scales generators
 */

export const scaleNumItems = (numItems, areaWidth, gutter = 100) => {
  return d3
    .scaleLinear()
    .domain([0, numItems - 1])
    .range([gutter, areaWidth - gutter]);
};

export const scaleNumItemsHeight = (numItems, height) =>
  scaleNumItems(numItems, height);

export const scaleNumItemsWidth = (numItems, width) =>
  scaleNumItems(numItems, width);

/*
   * Scales using percentages
   */
export const scalePercent = value => {
  return d3
    .scaleLinear()
    .domain([0, 1])
    .range([100, value - 100]);
};

export const scalePercentHeight = height => scalePercent(height);

export const scalePercentWidth = width => scalePercent(width);
