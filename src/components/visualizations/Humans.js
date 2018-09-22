import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TABLE_SORT_ASCENDING } from '../../constants/navigation';
import { selectItemAction } from '../../actions/visualizations';
import { getSortedItems } from '../../utils/data';
// import classNames from 'classnames';

import {
  getEnterDuration,
  getExitDuration,
  getUpdateDuration,
  getEnterDelay,
  getExitDelay,
  getUpdateDelay,
  getStrokeWidth,
  getStrokeColor,
  getRadius,
  getAvatarColor,
  getTitleFontSize,
  _getCenterPosition,
  _getImageData,
  _getTitleData
} from '../../utils/visualizations';

import * as d3 from 'd3';

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.visualRef = React.createRef();
  }

  prepareItemsForDisplay = (
    items = [],
    selectedItemId = null,
    sortBy = null,
    sortByDirection = TABLE_SORT_ASCENDING,
    listItemsSelected = []
  ) => {
    const updatedItems = items.map(item => {
      return {
        ...item,
        selected: item.id === selectedItemId,
        selectedForDeletion: listItemsSelected.indexOf(item.id) !== -1
      };
    });

    return getSortedItems(
      updatedItems,
      sortBy,
      sortByDirection === TABLE_SORT_ASCENDING
    );
  };

  /* 
   * Implementing d3 general update pattern
   */
  updateVisualization = function() {
    const displayData = this.prepareItemsForDisplay(
      this.props.items,
      this.props.selectedItemId,
      this.props.sortBy,
      this.props.sortByDirection,
      this.props.listItemsSelected
    );

    const r = d => {
      return d.selected ? 64 : 32;
    };

    // Using a curried function to generate positioning helper with awareness of
    // current properties while still using pure functions
    const getCenterPosition = _getCenterPosition({
      mode: this.props.sortBy === 'random' ? 'random' : 'metric',
      numItems: this.props.items.length,
      areaHeight: this.props.height,
      areaWidth: this.props.width
    });

    // Generate attribute helpers. This happens here instead of within util file because
    // 'getCenterPosition' now contains props data these functions use for scaling and positioning
    const getCenterPositionX = (human, i) => getCenterPosition(human, i).x;
    const getCenterPositionY = (human, i) => getCenterPosition(human, i).y;

    const getImageData = _getImageData(getCenterPosition);
    const getImageX = (item, i) => getImageData(item, i).x;
    const getImageY = (item, i) => getImageData(item, i).y;
    const getImageHeight = (item, i) => getImageData(item, i).h;
    const getImageWidth = (item, i) => getImageData(item, i).w;

    const getTitleData = _getTitleData(getCenterPosition);
    const getTitleX = (item, i) => getTitleData(item, i).x;
    const getTitleY = (item, i) => getTitleData(item, i).y;

    // Step 1 - Grab collection of containers (or automagically create later)
    const humanGroups = d3
      .select(this.visualRef.current)
      .selectAll('g')
      .data(displayData, h => `item-${h.id}`);

    // Step 2 - If updating existing containers, adjust properties with transition
    const containerUpdater = humanGroups
      .transition()
      .duration(getUpdateDuration())
      .delay(getUpdateDelay);
    // .ease(d3.easeBounceOut);

    // 2.1 Update circles
    containerUpdater
      .select('circle')

      .attr('r', getRadius)
      .attr('cx', getCenterPositionX)
      .attr('cy', getCenterPositionY)
      .style('fill', getAvatarColor)
      .style('stroke', getStrokeColor)
      .style('stroke-width', getStrokeWidth);

    // 2.2 Update text
    containerUpdater
      .select('text')
      .attr('font-size', getTitleFontSize)
      .attr('x', getTitleX)
      .attr('y', getTitleY);

    // 2.3 Update images
    containerUpdater
      .select('image')
      .attr('x', getImageX)
      .attr('y', getImageY)
      .style('opacity', 1)
      .attr('height', getImageHeight)
      .attr('width', getImageWidth);

    // Step 3 - If containers don't exist, create and initialize
    const containerEnter = humanGroups
      .enter()
      .append('g')
      .on('click', d => this.props.selectItem(d.id))
      // .on('dblclick', function(d) {
      //   d3.select(this).moveToBack();
      // })
      // .on('click', function(d) {
      //   d3.select(this).moveToFront();
      // })
      .attr('class', 'human');

    // 3.1 Add circle
    // 3.1.1 Initial state when appearing
    containerEnter
      .append('circle')
      .attr('class', 'item')
      .attr('r', 0)
      .attr('cx', getCenterPositionX)
      .attr('cy', getCenterPositionY)
      .style('fill', getAvatarColor)
      .style('stroke', getStrokeColor)
      .style('stroke-width', getStrokeWidth)
      // .style('fill-opacity', 0)
      // 3.1.2 Updated state after appearing
      .transition()
      .duration(getEnterDuration())
      .delay(getEnterDelay)
      .ease(d3.easeBounceOut)
      .attr('r', getRadius);
    // .attr('cy', d => {
    //   return y(this.props.sortByRandom ? d.y : 0.5);
    // })
    // .style('fill', d => {
    //   return d.selected ? 'green' : 'blue';
    // });

    // 4.1 Add name text
    // 4.1.1 Initial state when appearing
    containerEnter
      .append('text')
      .attr('class', 'name')
      .text(human => human.name)
      .attr('x', getTitleX)
      .attr('y', getTitleY)
      .attr('font-size', 0)
      // .style('stroke', getStrokeColor)
      // .style('fill', 'red')
      .style('fill', 'black')
      .style('text-anchor', 'middle')
      // 4.1.2 Updated state after appearing
      .transition()
      .duration(getEnterDuration())
      .delay(getEnterDelay)
      .ease(d3.easeBounceOut)

      .attr('font-size', getTitleFontSize);
    // .attr('y', (d, i) => {
    //   return y(this.props.sortByRandom ? d.y : 0.5) + r(d) + 18;
    // });

    // 5.1 Add avatar images
    // 5.1.1 Initial state when appearing
    containerEnter
      .append('image')
      .attr('xlink:href', ({ avatar }) => avatar)
      .attr('x', getImageX)
      .attr('y', getImageY)
      .style('opacity', 0)
      // .attr('height', d => (d.selected ? 128 : 64))
      // .attr('width', d => (d.selected ? 128 : 64))
      .attr('height', 0)
      .attr('width', 0)

      // 5.1.2 Updated state after appearing
      .transition()
      .duration(getEnterDuration())
      .delay(getEnterDelay)
      .ease(d3.easeBounceOut)
      .attr('height', getImageHeight)
      .attr('width', getImageWidth)
      .attr('x', getImageX)
      .attr('y', getImageY)
      .style('opacity', 1);

    // .attr('y', (d, i) => {
    //   return y(this.props.sortByRandom ? d.y : 0.5) - 32;

    // });

    const containerExit = humanGroups
      .exit()
      .filter(':not(.exiting)') // Don't select already exiting nodes
      .classed('exiting', true)
      .transition()
      .duration(getExitDuration())
      .delay(getExitDelay);

    containerExit.select('circle').attr('r', 0);

    containerExit
      .select('image')
      .attr('height', 0)
      .attr('width', 0)
      .attr('x', getImageX)
      .attr('y', getImageY);

    containerExit.select('text').attr('font-size', 0);

    containerExit
      .style('opacity', (d, i) => {
        return 0;
      })
      .style('fill-opacity', (d, i) => {
        return 0;
      })
      .style('stroke-opacity', (d, i) => {
        return 0;
      })
      .remove();
  };

  componentDidUpdate = function() {
    this.updateVisualization();
  };

  render() {
    return (
      <svg
        ref={this.visualRef}
        height={this.props.height}
        width={this.props.width}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
      />
    );
  }
}

Visualizer.propTypes = {
  items: PropTypes.array,
  selectedItemId: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  itemSizeBase: PropTypes.number,
  itemSizeActive: PropTypes.number,
  sortBy: PropTypes.string,
  sortByRandom: PropTypes.bool
};

Visualizer.defaultProps = {
  items: [],
  selectedItemId: null,
  height: 100,
  width: 100,
  itemSizeBase: 32,
  itemSizeActive: 48,
  sortBy: 'name',
  sortByRandom: false
};

const mapStateToProps = ({ humans, roles, navigation, visualizations }) => ({
  items: navigation.tab !== 1 ? humans : roles,
  selectedItemId: visualizations.selectedItemId,
  tab: navigation.tab,
  itemSizeBase: visualizations.itemSizeBase,
  itemSizeActive: visualizations.itemSizeActive,
  sortBy: navigation.sortBy,
  sortByDirection: navigation.sortByDirection,
  sortByRandom: navigation.sortBy === 'random',
  listItemsSelected: navigation.listItemsSelected
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectItem: selectItemAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visualizer);
