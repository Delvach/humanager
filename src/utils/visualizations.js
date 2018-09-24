import * as d3 from 'd3';

import {
  HUMAN_VISUAL_SETTINGS,
  TRANSITION_DURATIONS,
  TRANSITION_DELAYS,
  // VISUALIZATION_MODE_RANDOM,
  // VISUALIZATION_MODE_METRIC,
  // VISUALIZATION_MODE_FORCE,
  VISUALIZATION_BEHAVIOR_SORTED,
  VISUALIZATION_BEHAVIOR_FORCE,
  VISUALIZATION_BEHAVIOR_RANDOM
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
 * Generate two random values for scaled display
 */
export const getRandomPosition = () => ({
  x: Math.random(),
  y: Math.random(),
  type: 'random'
});

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

// Retrieve settings for transition delays
export const _getTransitionDelays = settings => transitionType =>
  settings[transitionType];
export const getDelay = _getTransitionDelays(TRANSITION_DELAYS);

export const getEnterDelay = (_, i) => getDelay('enter') * i;
export const getExitDelay = (_, i) => getDelay('exit') * i;
export const getUpdateDelay = (_, i) => getDelay('update') * i;

// Retrieve settings for human visual (avatar; need naming convention since avatar is specific to image)
export const _getitemSettings = settings => (parameterName, variant = 'base') =>
  settings[variant][parameterName];

export const getHumanSettings = _getitemSettings(HUMAN_VISUAL_SETTINGS);
export const getSpecificItemSetting = parameterName => (human, i) => {
  let status = 'base';
  if (human.selected || human.selectedForDeletion) {
    status = human.selectedForDeletion ? 'selectedForDeletion' : 'selected';
  }
  return getHumanSettings(parameterName, status);
};

export const getStrokeWidth = getSpecificItemSetting('strokeWidth');
export const getStrokeColor = getSpecificItemSetting('stroke');

export const getRadius = getSpecificItemSetting('radius');

export const getAvatarColor = item => item.color;

export const getRadiusToAvatarRatio = getSpecificItemSetting(
  'radiusToAvatarRatio'
);
export const getTitleFontSize = getSpecificItemSetting('fontSize');

export const _getCenterPosition = data => (item, i) => {
  const { behavior, numItems, areaHeight, areaWidth } = data;

  let xScale, yScale;
  const { x, y } = item;
  switch (behavior) {
    case VISUALIZATION_BEHAVIOR_RANDOM.value:
      xScale = scalePercentWidth(areaWidth);
      yScale = scalePercentHeight(areaHeight);
      return { x: xScale(x), y: yScale(y) };
    case VISUALIZATION_BEHAVIOR_SORTED.value:
      xScale = scaleNumItemsWidth(numItems, areaWidth);
      // yScale = scaleNumItemsHeight(numItems, areaHeight);
      yScale = scalePercentHeight(areaHeight);
      return { x: xScale(i), y: yScale(0.5) };
    default:
    case VISUALIZATION_BEHAVIOR_FORCE.value:
      return { x, y };
  }
};

export const _getImageData = getCenter => (item, i) => {
  const { x, y } = getCenter(item, i);
  const radius = getRadius(item, i);
  const ratio = getRadiusToAvatarRatio(item, i);
  return getSquareInCircle(x, y, radius * ratio);
};

export const _getTitleData = getCenter => (item, i) => {
  const { x, y } = getCenter(item, i);
  return {
    x,
    y: y + getRadius(item, i) * 1.6
  };
};
