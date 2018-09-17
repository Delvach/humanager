import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classNames from 'classnames';

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

  componentDidUpdate = function() {
    const x = d3
      .scaleLinear()
      .domain([0, this.props.humans.length - 1])
      .range([100, this.props.width - 100]);

    const y = d3
      .scaleLinear()
      .domain([0, 1])
      .range([150, this.props.height - 150]);

    const r = d3
      .scaleLinear()
      .domain([0, this.props.humans.length - 1])
      .range([
        10,
        this.props.humans.length ? this.props.humans.length * 10 : 10
      ]);
    var item = d3
      .select(this.visualRef.current)
      .selectAll('circle')
      .data(this.props.humans, function(h) {
        return h.id;
      });

    item
      .transition()
      .duration(1000)
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
      .transition()
      .duration(1000)
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
  humans: PropTypes.array,

  height: PropTypes.number,
  width: PropTypes.number
};

Visualizer.defaultProps = {
  humans: [],
  height: 100,
  width: 100
};

const mapStateToProps = ({ humans, visualizations }) => ({
  humans,
  bit: visualizations.bit
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visualizer);
