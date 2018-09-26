import * as d3 from 'd3';

import {
  VISUALIZATION_BEHAVIOR_SORTED,
  VISUALIZATION_BEHAVIOR_FORCE,
  VISUALIZATION_BEHAVIOR_RANDOM
} from '../constants/visualizations';

import {
  scalePercentHeight,
  scalePercentWidth,
  scalePercentDepth,
  // scaleNumItemsHeight,
  scaleNumItemsWidth
} from './scales';

import { getSquareInCircle } from './visualizations';

export const Items = (
  h,
  w,
  propSettings,
  _itemSettings,
  _durations,
  _delays
) => {
  let calc = {},
    height = h,
    width = w,
    settings = propSettings,
    itemSettings = _itemSettings,
    durations = _durations,
    delays = _delays,
    updateSettings = ({
      behavior,
      numItems,
      areaHeight,
      areaWidth,
      ascending
    }) => {
      settings.behavior = behavior;
      settings.numItems = numItems;

      settings.areaHeight = areaHeight;
      settings.areaWidth = areaWidth;

      settings.ascending = ascending;
    },
    getCenterPosition = (item, i) => {
      let xScale, yScale, zScale;
      const { x, y, z } = item;
      switch (settings.behavior) {
        case VISUALIZATION_BEHAVIOR_RANDOM.value:
          xScale = scalePercentWidth(settings.areaWidth);
          yScale = scalePercentHeight(settings.areaHeight);
          zScale = scalePercentDepth();
          return { x: xScale(x), y: yScale(y), z: zScale(z) };
        case VISUALIZATION_BEHAVIOR_SORTED.value:
          xScale = scaleNumItemsWidth(settings.numItems, settings.areaWidth);
          // yScale = scaleNumItemsHeight(numItems, areaHeight);
          yScale = scalePercentHeight(settings.areaHeight);
          zScale = scalePercentDepth();
          return { x: xScale(i), y: yScale(0.5), z: zScale(0.5) };
        default:
        case VISUALIZATION_BEHAVIOR_FORCE.value:
          return { x, y, z };
      }
    },
    getDuration = transitionType => durations[transitionType],
    getEnterDuration = () => getDuration('enter'),
    getExitDuration = () => getDuration('exit'),
    getUpdateDuration = () => getDuration('update'),
    getDelay = transitionType => delays[transitionType],
    getEnterDelay = (d, i) => {
      return Math.floor(d.z * 200);
      // return getDelay('enter');
    },
    getExitDelay = () => getDelay('exit'),
    getUpdateDelay = (d, i) => {
      return Math.floor(d.z * 200);
      // return getDelay('update');
    },
    getStatus = (item, i) => {
      let status = 'base';
      if (item.selected || item.selectedForDeletion) {
        status = item.selectedForDeletion ? 'selectedForDeletion' : 'selected';
      }
      return status;
    },
    getCenterPositionX = (item, i) => getCenterPosition(item, i).x,
    getCenterPositionY = (item, i) => getCenterPosition(item, i).y,
    getImageData = (item, i) => {
      const { x, y } = getCenterPosition(item, i);
      const radius = getCircleRadius(item, i);
      const ratio = getRadiusToAvatarRatio(item, i);
      return { a: 1, ...getSquareInCircle(x, y, radius * ratio) };
    },
    getRadiusToAvatarRatio = (item, i) => {
      return itemSettings[getStatus(item, i)].radiusToAvatarRatio;
    },
    getAvatarColor = item => item.color,
    getStrokeColor = (item, i) => {
      return itemSettings[getStatus(item, i)].stroke;
    },
    getStrokeWidth = (item, i) => {
      return itemSettings[getStatus(item, i)].strokeWidth;
    },
    getTitleFontSize = (item, i) => {
      return itemSettings[getStatus(item, i)].fontSize;
    },
    getImageX = (item, i) => getImageData(item, i).x,
    getImageY = (item, i) => getImageData(item, i).y,
    getImageHeight = (item, i) => getImageData(item, i).h,
    getImageWidth = (item, i) => getImageData(item, i).w,
    getTitleData = (item, i) => {
      const { x, y } = getCenterPosition(item, i);
      return {
        x,
        y: y + getCircleRadius(item, i) * 1.6 // SINNER
      };
    },
    getTitleX = (item, i) => getTitleData(item, i).x,
    getTitleY = (item, i) => getTitleData(item, i).y,
    getCircleRadius = (item, i) => {
      const { z } = item;
      switch (settings.behavior) {
        case VISUALIZATION_BEHAVIOR_RANDOM.value:
          return scalePercentDepth()(z);
        //   return zScale(z);

        case VISUALIZATION_BEHAVIOR_FORCE.value:
          return z;

        default:
        case VISUALIZATION_BEHAVIOR_SORTED.value:
          return itemSettings[getStatus(item, i)].radius;
      }
    },
    updateGroup = group => {
      const updater = group.transition().duration(getUpdateDuration);
      // .delay(getUpdateDelay);
      //.ease(d3.easeBounceOut);

      updateCircle(updater);
      updateText(updater);
      updateImage(updater);
    },
    enterGroup = group => {
      const enterer = group
        .enter()
        .append('g')
        // .on('click', d => {
        //   this.props.selectItem(d.id); // TO DO
        //   d3.event.stopPropagation();
        // });
        // .on('dblclick', function(d) {
        //   d3.select(this).moveToBack();
        // })
        .on('click', function(d) {
          d3.select(this).moveToFront();
        });
      // .attr('class', 'human');

      enterCircle(enterer);
      enterText(enterer);
      enterImage(enterer);
    },
    exitGroup = group => {
      const exiter = group
        .exit()
        .filter(':not(.exiting)') // Don't select already exiting nodes
        .classed('exiting', true)
        .transition()
        .duration(getExitDuration)
        .delay(getExitDelay);

      exitCircle(exiter);
      exitText(exiter);
      exitImage(exiter);

      exiter
        .style('opacity', 0)
        .style('fill-opacity', 0)
        .style('stroke-opacity', 0)
        .remove();
    },
    updateCircle = updater => {
      updater
        .select('circle')
        .delay(getUpdateDelay)
        .attr('r', getCircleRadius)
        .attr('cx', getCenterPositionX)
        .attr('cy', getCenterPositionY)
        .style('fill', getAvatarColor)
        .style('stroke', getStrokeColor)
        .style('stroke-width', getStrokeWidth);
      // .style('opacity', (d, i) => d.z);
    },
    enterCircle = enterer => {
      enterer
        .append('circle')
        .attr('class', 'item')
        .attr('r', 0)
        .attr('cx', getCenterPositionX)
        .attr('cy', getCenterPositionY)
        .style('fill', getAvatarColor)
        .style('stroke', getStrokeColor)
        .style('stroke-width', getStrokeWidth)

        // 3.1.2 Updated state after appearing
        .transition()
        .duration(getEnterDuration)
        .delay(getEnterDelay)
        .ease(d3.easeBounceOut)
        .attr('r', getCircleRadius);
    },
    exitCircle = exiter => {
      exiter.select('circle').attr('r', 0);
    },
    updateImage = updater => {
      updater
        .select('image')
        .delay(getUpdateDelay)
        .attr('x', getImageX)
        .attr('y', getImageY)
        .style('opacity', 1)
        .attr('height', getImageHeight)
        .attr('width', getImageWidth);
    },
    enterImage = enterer => {
      enterer
        .append('image')
        .attr('xlink:href', ({ avatar }) => avatar)
        .attr('x', getImageX)
        .attr('y', getImageY)
        .style('opacity', 0)
        .attr('height', 0)
        .attr('width', 0)

        // 5.1.2 Updated state after appearing
        .transition()
        .duration(getEnterDuration)
        .delay(getEnterDelay)
        .ease(d3.easeBounceOut)
        .attr('height', getImageHeight)
        .attr('width', getImageWidth)
        .attr('x', getImageX)
        .attr('y', getImageY)
        .style('opacity', 1);
    },
    exitImage = exiter => {
      exiter
        .select('image')
        .attr('height', 0)
        .attr('width', 0);
    },
    updateText = updater => {
      updater
        .select('text')
        .delay(getUpdateDelay)
        .text(item => item.name)
        .attr('font-size', getTitleFontSize)
        .attr('x', getTitleX)
        .attr('y', getTitleY);
    },
    enterText = enterer => {
      enterer
        .append('text')
        .attr('class', 'name')
        .text(human => human.name)
        .attr('x', getTitleX)
        .attr('y', getTitleY)
        .attr('font-size', 0)
        // .style('stroke', getStrokeColor)
        .style('fill', 'black')
        .style('text-anchor', 'middle')

        // 4.1.2 Updated state after appearing
        .transition()
        .duration(getEnterDuration)
        .delay(getEnterDelay)
        .ease(d3.easeBounceOut)

        .attr('font-size', getTitleFontSize);
    },
    exitText = exiter => {
      exiter.select('text').attr('font-size', 0);
    },
    reorderGroup = (behavior, group) => {
      group.each(function(d, i) {
        d3.select(this)[behavior === 'random' ? 'moveToFront' : 'moveToBack']();
      });
    };

  calc.height = height;
  calc.width = width;

  calc.settings = settings;
  calc.itemSettings = itemSettings;

  calc.durations = durations;
  calc.delays = delays;

  calc.updateSettings = updateSettings;

  calc.getCenterPosition = getCenterPosition;

  calc.getEnterDuration = getEnterDuration;
  calc.getExitDuration = getExitDuration;
  calc.getUpdateDuration = getUpdateDuration;

  calc.getEnterDelay = getEnterDelay;
  calc.getExitDelay = getExitDelay;
  calc.getUpdateDelay = getUpdateDelay;

  calc.getStatus = getStatus;

  calc.getCenterPositionX = getCenterPositionX;
  calc.getCenterPositionY = getCenterPositionY;

  calc.getImageData = getImageData;

  calc.getRadiusToAvatarRatio = getRadiusToAvatarRatio;
  calc.getAvatarColor = getAvatarColor;

  calc.getStrokeColor = getStrokeColor;
  calc.getStrokeWidth = getStrokeWidth;
  calc.getTitleFontSize = getTitleFontSize;

  calc.getImageX = getImageX;
  calc.getImageY = getImageY;

  calc.getImageHeight = getImageHeight;
  calc.getImageWidth = getImageWidth;

  calc.getCircleRadius = getCircleRadius;

  calc.getTitleData = getTitleData;
  calc.getTitleX = getTitleX;
  calc.getTitleY = getTitleY;

  calc.updateGroup = updateGroup;
  calc.enterGroup = enterGroup;
  calc.exitGroup = exitGroup;

  calc.updateCircle = updateCircle;
  calc.enterCircle = enterCircle;
  calc.exitCircle = exitCircle;

  calc.updateImage = updateImage;
  calc.enterImage = enterImage;
  calc.exitImage = exitImage;

  calc.updateText = updateText;
  calc.enterText = enterText;
  calc.exitText = exitText;
  calc.reorderGroup = reorderGroup;

  return calc;
};
