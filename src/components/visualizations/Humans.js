import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

  updateVisualizationDefault = function() {
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
    var item = d3
      .select(this.visualRef.current)
      .selectAll('circle')
      .data(this.props.items, function(h) {
        return h.id;
      });

    item
      .transition()
      .duration(1000)
      .delay((d, i) => {
        return i * 350;
      })
      .attr('r', function(d, i) {
        return r(i);
      })
      .attr('cx', function(d, i) {
        return x(i);
      });

    item
      .enter()
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
      .transition()
      .delay((d, i) => {
        return i * 350;
      })
      .duration(1000)
      .ease(d3.easeBounceOut)
      .style('fill', 'pink')
      .attr('cy', function(d) {
        return y(Math.random());
      })
      .style('stroke', '#81E797');

    item
      .exit()
      .filter(':not(.exiting)') // Don't select already exiting nodes
      .classed('exiting', true)
      .transition()
      .duration(1000)
      .attr('cy', this.props.height)
      .style('stroke', '#3E6E9C')
      .remove();
  };

  /* 
   * Implementing d3 general update pattern
   */
  updateVisualizationGrouped = function() {
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
      .data(this.props.items, function(h) {
        return h.id;
      });

    // Step 2 - If updating existing containers, adjust properties with transition
    const containerUpdater = humanGroups.transition().duration(1000);
    // .ease(d3.easeBounceOut);

    // 2.1 Update circles
    containerUpdater
      .select('circle')
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

    // Step 3 - If containers don't exist, create and initialize
    const containerEnter = humanGroups
      .enter()
      .append('g')
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
      .style('fill', 'green')
      .attr('cy', function(d) {
        return y(Math.random());
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
      // 4.1.2 Updated state after appearing
      .transition()
      .duration(1000)
      .ease(d3.easeBounceOut)
      .style('fill', 'green')
      .attr('y', function(d) {
        return y(Math.random());
      });

    const containerExit = humanGroups
      .exit()
      .filter(':not(.exiting)') // Don't select already exiting nodes
      .classed('exiting', true)
      .transition()
      .duration(1000);

    containerExit
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

  height: PropTypes.number,
  width: PropTypes.number
};

Visualizer.defaultProps = {
  items: [],
  height: 100,
  width: 100
};

const mapStateToProps = ({ humans, roles, navigation, visualizations }) => ({
  items: navigation.tab === 0 ? humans : roles,
  bit: visualizations.bit,
  tab: navigation.tab
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visualizer);
