import * as d3 from 'd3';

import {
  HUMAN_VISUAL_SETTINGS,
  TRANSITION_DURATIONS,
  VISUALIZATION_MODE_RANDOM,
  VISUALIZATION_MODE_METRIC,
  VISUALIZATION_MODE_FORCE
} from '../constants/visualizations';

import {
  scalePercentHeight,
  scalePercentWidth,
  // scaleNumItemsHeight,
  scaleNumItemsWidth
} from './scales';

d3.selection.prototype.moveToFront = function() {
  return this.each(function() {
    this.parentNode.appendChild(this);
  });
};
d3.selection.prototype.moveToBack = function() {
  return this.each(function() {
    var firstChild = this.parentNode.firstChild;
    if (firstChild) {
      this.parentNode.insertBefore(this, firstChild);
    }
  });
};

/*
 * Return values as '#px'
 */
export const dataAsPx = d => `${d}px`;

/*
 * Generate two random values for scaled display
 */
export const getRandomPosition = () => ({
  x: Math.random(),
  y: Math.random(),
  type: 'random'
});

/*
 * Given the center coordinates and radius of a circle,
 * return the height, width, top/left dimensions
 */
export const getSquareInCircle = (cx, cy, radius) => {
  const side = Math.sqrt(radius * radius * 2); // calc side length of square
  const half = side * 0.5; // position offset

  return {
    x: cx - half,
    y: cy - half,
    w: side,
    h: side
  };
};

/* 
 * Curried functions to stick with pure functions for (future) tests
 */

// Retrieve settings for transition duration
export const _getTransitionDurations = settings => transitionType =>
  settings[transitionType];

export const getDuration = _getTransitionDurations(TRANSITION_DURATIONS);
export const getEnterDuration = () => getDuration('enter');
export const getExitDuration = () => getDuration('exit');
export const getUpdateDuration = () => getDuration('update');

// Retrieve settings for human visual (avatar; need naming convention since avatar is specific to image)
export const _getHumanSettings = settings => (
  parameterName,
  variant = 'base'
) => settings[variant][parameterName];

export const getHumanSettings = _getHumanSettings(HUMAN_VISUAL_SETTINGS);
export const getSpecificHumanSetting = parameterName => (human, i) => {
  let status = 'base';
  if (human.selected || human.selectedForDeletion) {
    status = human.selectedForDeletion ? 'selectedForDeletion' : 'selected';
  }
  return getHumanSettings(parameterName, status);
};

export const getStrokeWidth = getSpecificHumanSetting('strokeWidth');
export const getStrokeColor = getSpecificHumanSetting('stroke');
export const getRadius = getSpecificHumanSetting('radius');
export const getAvatarColor = human => human.color;

export const _getCenterPosition = data => (human, i) => {
  const { mode, numItems, areaHeight, areaWidth } = data;

  let xScale, yScale;
  const { x, y } = human;
  switch (mode) {
    case VISUALIZATION_MODE_RANDOM:
      xScale = scalePercentWidth(areaWidth);
      yScale = scalePercentHeight(areaHeight);
      return { x: xScale(x), y: yScale(y) };
    case VISUALIZATION_MODE_METRIC:
      xScale = scaleNumItemsWidth(numItems, areaWidth);
      // yScale = scaleNumItemsHeight(numItems, areaHeight);
      yScale = scalePercentHeight(areaHeight);
      return { x: xScale(i), y: yScale(0.5) };
    default:
    case VISUALIZATION_MODE_FORCE:
      return { x, y };
  }
};
