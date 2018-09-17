import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getFauxAvatarImageURL } from '../../utils/humans';

import { selectItemAction } from '../../actions/visualizations';

// import classNames from 'classnames';

import * as d3 from 'd3';

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.visualRef = React.createRef();
  }
  // } = ({ humans, height, width }) => {
  //   const x = d3.scale
  //     .linear()
  //     .domain([0, 1])
  //     .range([0, width]);
  //   padding = 100;

  //   const r = d3.scale
  //     .sqrt()
  //     .domain([0, 1])
  //     .range([0, 30]);

  //   maxRadius = this.props.humans.length ? this.props.humans.length * 10 : 10;

  prepareItemsForDisplay = (items, selectedItemId = null, sortBy = null) => {
    let updatedItems = items.map(item => {
      const randomX = Math.random();
      const randomY = Math.random();
      const selected = item.id === selectedItemId;
      return { ...item, selected, randomX, randomY };
    });

    if (sortBy) {
      updatedItems.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) return 1;
        if (b[sortBy] > a[sortBy]) return -1;
        return 0;
      });
      return updatedItems;
    }

    return updatedItems;
  };

  /* 
   * Implementing d3 general update pattern
   */
  updateVisualizationGrouped = function() {
    const displayData = this.prepareItemsForDisplay(
      this.props.items,
      this.props.selectedItemId,
      'name'
    );

    const x = d3
      .scaleLinear()
      .domain([0, this.props.items.length - 1])
      .range([100, this.props.width - 100]);

    const y = d3
      .scaleLinear()
      .domain([0, 1])
      .range([150, this.props.height - 300]);

    const r = d3
      .scaleLinear()
      .domain([0, this.props.items.length - 1])
      .range([10, this.props.items.length ? this.props.items.length * 10 : 10]);

    // Step 1 - Grab collection of containers (or automagically create later)
    const humanGroups = d3
      .select(this.visualRef.current)
      .selectAll('g')
      .data(displayData, function(h) {
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
      .attr('r', function(d, i) {
        return r(i);
      })
      .attr('cx', function(d, i) {
        return x(i);
      });

    // 2.2 Update text
    containerUpdater.select('text').attr('x', function(d, i) {
      return x(i);
    });

    // 2.3 Update images
    containerUpdater.select('image').attr('x', function(d, i) {
      return x(i);
    });

    // Step 3 - If containers don't exist, create and initialize
    const containerEnter = humanGroups
      .enter()
      .append('g')
      .on('click', d => this.props.selectItem(d.id))
      .attr('class', 'human');

    // 3.1 Add (image cropping) circle
    // 3.1.1 Initial state when appearing
    containerEnter
      .append('circle')
      .attr('class', 'item')
      .attr('r', function(d, i) {
        return r(i);
      })
      .attr('cx', function(d, i) {
        return x(i);
      })
      .attr('cy', 0)
      .style('stroke', '#3E6E9C')
      .style('fill', 'red')
      // 3.1.2 Updated state after appearing
      .transition()
      .duration(1000)
      .ease(d3.easeBounceOut)
      .style('fill', d => {
        return d.selected ? 'green' : 'blue';
      })
      .attr('cy', function(d) {
        return y(d.randomY);
      });

    // 4.1 Add name text
    // 4.1.1 Initial state when appearing
    containerEnter
      .append('text')
      .attr('class', 'name')
      .text(human => human.name)
      .attr('x', function(d, i) {
        return x(i);
      })
      .attr('y', 100)
      .style('stroke', '#3E6E9C')
      .style('fill', 'red')
      .style('text-anchor', 'middle')
      // 4.1.2 Updated state after appearing
      .transition()
      .duration(1000)
      .ease(d3.easeBounceOut)
      .style('fill', 'green')
      .attr('y', function(d, i) {
        return y(d.randomY) + r(i) + 18;
      });

    // 5.1 Add avatar images
    // 5.1.1 Initial state when appearing
    containerEnter
      .append('image')
      .attr('xlink:href', function({ email }) {
        return getFauxAvatarImageURL({ email, size: 64 });
      })
      .attr('x', function(d, i) {
        return x(i);
      })
      .attr('y', 100)
      .attr('height', 64)
      .attr('width', 64)

      // 5.1.2 Updated state after appearing
      .transition()
      .duration(1000)
      .ease(d3.easeBounceOut)

      .attr('y', function(d, i) {
        return y(d.randomY);
      });

    const containerExit = humanGroups
      .exit()
      .filter(':not(.exiting)') // Don't select already exiting nodes
      .classed('exiting', true)
      .transition()
      .duration(1000);

    containerExit
      .style('opacity', function(d, i) {
        return 0;
      })
      .style('fill-opacity', function(d, i) {
        return 0;
      })
      .style('stroke-opacity', function(d, i) {
        return 0;
      })
      .remove();
  };

  componentDidUpdate = function() {
    // this.updateVisualizationDefault();
    this.updateVisualizationGrouped();
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
  width: PropTypes.number
};

Visualizer.defaultProps = {
  items: [],
  selectedItemId: null,
  height: 100,
  width: 100
};

const mapStateToProps = ({ humans, roles, navigation, visualizations }) => ({
  items: navigation.tab === 0 ? humans : roles,
  selectedItemId: visualizations.selectedItemId,
  bit: visualizations.bit,
  tab: navigation.tab
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectItem: selectItemAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visualizer);
