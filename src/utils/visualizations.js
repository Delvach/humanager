import * as d3 from 'd3';

import {
  HUMAN_VISUAL_SETTINGS,
  TRANSITION_DURATIONS
} from '../constants/visualizations';

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

// Curried functions to stick with pure functions (future tests)

// Retrieve settings for human visual (avatar; need naming convention since avatar is specific to image)
export const _getHumanSettings = settings => (
  parameterName,
  variant = 'base'
) => settings[variant][parameterName];

// Retrieve settings for transition duration
export const _getTransitionDurations = settings => transitionType =>
  settings[transitionType];

export const getHumanSettings = _getHumanSettings(HUMAN_VISUAL_SETTINGS);
export const getDuration = _getTransitionDurations(TRANSITION_DURATIONS);
export const getEnterDuration = () => getDuration('enter');
export const getExitDuration = () => getDuration('exit');
export const getUpdateDuration = () => getDuration('update');
