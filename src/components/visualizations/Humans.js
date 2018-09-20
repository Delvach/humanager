import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectItemAction, getSortedItems } from '../../actions/visualizations';

// import classNames from 'classnames';

import * as d3 from 'd3';

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

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.visualRef = React.createRef();
  }

  prepareItemsForDisplay = (
    items = [],
    selectedItemId = null,
    sortBy = null
  ) => {
    // Add flag to indicate whether is currently selected item
    const updatedItems = items.map(item => {
      const selected = item.id === selectedItemId;
      return { ...item, selected };
    });

    return getSortedItems(updatedItems, sortBy);
  };

  /*
   * Scales using number of items
   */
  getLinearScaleUsingNumItems = (numItems, areaWidth) => {
    return d3
      .scaleLinear()
      .domain([0, numItems - 1])
      .range([100, areaWidth - 100]);
  };

  getLinearHeightScaleUsingNumItems = (numItems, height) =>
    this.getLinearScaleUsingNumItems(numItems, height);

  getLinearWidthScaleUsingNumItems = (numItems, width) =>
    this.getLinearScaleUsingNumItems(numItems, width);

  /*
   * Scales using percentages
   */
  getLinearScaleUsingPercentage = value => {
    return d3
      .scaleLinear()
      .domain([0, 1])
      .range([100, value - 100]);
  };

  getLinearHeightScaleUsingPercentage = height =>
    this.getLinearScaleUsingPercentage(height);

  getLinearWidthScaleUsingPercentage = width =>
    this.getLinearScaleUsingPercentage(width);

  /* 
   * Implementing d3 general update pattern
   */
  updateVisualization = function() {
    const displayData = this.prepareItemsForDisplay(
      this.props.items,
      this.props.selectedItemId,
      this.props.sortBy
    );

    const x = this.getLinearWidthScaleUsingNumItems(
      this.props.items.length,
      this.props.width
    );

    const xPercent = this.getLinearWidthScaleUsingPercentage(this.props.width);
    const y = this.getLinearHeightScaleUsingPercentage(this.props.height);

    // const getGroupTopLeftPosition = human => ({
    //   x: human.x - this.props.itemSizeBase / 2,
    //   y: human.y - this.props.itemSizeBase / 2
    // });

    // const r = d3
    //   .scaleLinear()
    //   .domain([0, this.props.items.length - 1])
    //   .range([10, this.props.items.length ? this.props.items.length * 10 : 10]);
    const r = d => {
      return d.selected ? 64 : 32;
    };

    /*
     * Coordinates helpers
     */
    const getCenterCoordinatesX = (item, index) => {
      const value = this.props.sortByRandom ? item.x : index;
      const scale = this.props.sortByRandom
        ? this.getLinearWidthScaleUsingPercentage(this.props.width)
        : this.getLinearWidthScaleUsingNumItems(
            this.props.items.length,
            this.props.width
          );
      return scale(value);
    };

    // Step 1 - Grab collection of containers (or automagically create later)
    const humanGroups = d3
      .select(this.visualRef.current)
      .selectAll('g')
      .data(displayData, h => {
        return h.id;
      });

    // Step 2 - If updating existing containers, adjust properties with transition
    const containerUpdater = humanGroups.transition().duration(1000);
    // .ease(d3.easeBounceOut);

    // 2.1 Update circles
    containerUpdater
      .select('circle')
      .style('fill', d => {
        return d.selected ? 'green' : 'blue';
      })
      .attr('r', (d, i) => {
        return r(d) * 1.4;
      })
      .attr('cx', getCenterCoordinatesX)
      .attr('cy', d => {
        return y(this.props.sortByRandom ? d.y : 0.5);
      })
      .style('fill', d => d.color)
      .style('stroke', '#000000')
      .style('stroke-width', '1px');

    // 2.2 Update text
    containerUpdater
      .select('text')
      .attr('font-size', '18px')
      .attr('x', getCenterCoordinatesX)
      .attr('y', (d, i) => {
        return y(this.props.sortByRandom ? d.y : 0.5) + r(d) + 28;
      });

    // 2.3 Update images
    containerUpdater
      .select('image')
      .attr('x', (d, i) => {
        return getCenterCoordinatesX(d, i) - (d.selected ? 64 : 32);
      })
      .attr('y', (d, i) => {
        return y(this.props.sortByRandom ? d.y : 0.5) - (d.selected ? 64 : 32);
      })
      .style('opacity', 1)
      .attr('height', d => (d.selected ? 128 : 64))
      .attr('width', d => (d.selected ? 128 : 64));

    // Step 3 - If containers don't exist, create and initialize
    const containerEnter = humanGroups
      .enter()
      .append('g')
      // .on('click', d => this.props.selectItem(d.id))
      .on('click', function(d) {
        d3.select(this).moveToBack();
      })
      .on('dblclick', function(d) {
        d3.select(this).moveToFront();
      })
      .attr('class', 'human');

    // 3.1 Add circle
    // 3.1.1 Initial state when appearing
    containerEnter
      .append('circle')
      .attr('class', 'item')
      .attr('r', 0)
      .attr('cx', getCenterCoordinatesX)
      .attr('cy', d => {
        return y(this.props.sortByRandom ? d.y : 0.5);
      })
      .style('fill', d => d.color)
      .style('stroke', '#000000')
      .style('stroke-width', '1px')
      // .style('fill-opacity', 0)
      // 3.1.2 Updated state after appearing
      .transition()
      .duration(1000)
      .delay((_, i) => i * 20)
      .ease(d3.easeBounceOut)
      .attr('r', (d, i) => {
        return r(d) * 1.4;
      });
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
      .attr('x', getCenterCoordinatesX)
      .attr('y', (d, i) => {
        return y(this.props.sortByRandom ? d.y : 0.5) + r(d) + 28;
      })
      .attr('font-size', 0)
      // .style('stroke', '#3E6E9C')
      // .style('fill', 'red')
      .style('fill', 'black')
      .style('text-anchor', 'middle')
      // 4.1.2 Updated state after appearing
      .transition()
      .duration(1000)
      .ease(d3.easeBounceOut)

      .attr('font-size', '18px');
    // .attr('y', (d, i) => {
    //   return y(this.props.sortByRandom ? d.y : 0.5) + r(d) + 18;
    // });

    // 5.1 Add avatar images
    // 5.1.1 Initial state when appearing
    containerEnter
      .append('image')
      .attr('xlink:href', ({ avatar }) => avatar)
      .attr('x', (d, i) => {
        return getCenterCoordinatesX(d, i);
      })
      .attr('y', (d, i) => {
        return y(this.props.sortByRandom ? d.y : 0.5);
      })
      .style('opacity', 0)
      // .attr('height', d => (d.selected ? 128 : 64))
      // .attr('width', d => (d.selected ? 128 : 64))
      .attr('height', 0)
      .attr('width', 0)

      // 5.1.2 Updated state after appearing
      .transition()
      .duration(1000)
      .delay((_, i) => i * 20)
      .ease(d3.easeBounceOut)
      .attr('height', d => (d.selected ? 128 : 64))
      .attr('width', d => (d.selected ? 128 : 64))
      .attr('x', (d, i) => {
        return getCenterCoordinatesX(d, i) - 32;
      })
      .attr('y', (d, i) => {
        return y(this.props.sortByRandom ? d.y : 0.5) - 32;
      })
      .style('opacity', 1);

    // .attr('y', (d, i) => {
    //   return y(this.props.sortByRandom ? d.y : 0.5) - 32;

    // });

    const containerExit = humanGroups
      .exit()
      .filter(':not(.exiting)') // Don't select already exiting nodes
      .classed('exiting', true)
      .transition()
      .duration(500);

    containerExit.select('circle').attr('r', 0);

    containerExit
      .select('image')
      .attr('height', 0)
      .attr('width', 0)
      .attr('x', (d, i) => {
        return getCenterCoordinatesX(d, i);
      })
      .attr('y', (d, i) => {
        return y(this.props.sortByRandom ? d.y : 0.5);
      });

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
  items: navigation.tab === 0 ? humans : roles,
  selectedItemId: visualizations.selectedItemId,
  bit: visualizations.bit,
  tab: navigation.tab,
  itemSizeBase: visualizations.itemSizeBase,
  itemSizeActive: visualizations.itemSizeActive,
  sortBy: visualizations.sortBy,
  sortByRandom: visualizations.sortBy === 'random'
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectItem: selectItemAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visualizer);
