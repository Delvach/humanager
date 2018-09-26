import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'underscore';

import { VISUALIZATION_BEHAVIOR_FORCE } from '../../constants/visualizations';
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
    this.svgRef = React.createRef();
    this.containerRef = React.createRef();

    const dataset = {
      nodes: [{ name: 'Tim' }, { name: 'Bob' }, { name: 'Trevor' }],
      edges: [
        {
          source: 0,
          target: 1
        },
        {
          source: 0,
          target: 2
        }
      ]
    };

    this.force = d3
      .forceSimulation(dataset.nodes)
      .force('charge', d3.forceManyBody())
      .force('link', d3.forceLink(dataset.edges))
      // .size([this.props.width, this.props.height])
      .force(
        'center',
        d3
          .forceCenter()
          .x(this.props.width / 2)
          .y(this.props.height / 2)
      );

    // .size([this.props.width, this.props.height]);

    // this.force = d3
    //   .forceSimulation()
    //   .force('charge', d3.forceManyBody().strength(5))
    //   .force(
    //     'center',
    //     d3.forceCenter(this.props.width / 2, this.props.height / 2)
    //   )
    //   .force('collision', d3.forceCollide().radius(d => d.radius / 2));
  }

  enterNode = selection => {
    selection.classed('node', true);

    selection
      .append('circle')
      .attr('r', d => d.size)
      .call(this.force.drag);

    selection
      .append('text')
      .attr('x', d => d.size + 5)
      .attr('dy', '.35em')
      .text(d => d.key);
  };

  updateNode = selection => {
    selection.attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');
  };

  enterLink = selection => {
    selection.classed('link', true).attr('stroke-width', d => d.size);
  };

  updateLink = selection => {
    selection
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
  };

  updateGraph = selection => {
    selection.selectAll('.node').call(this.updateNode);
    selection.selectAll('.link').call(this.updateLink);
  };

  getEdgeData = itemsData => {};

  getNodesData = itemsData => {};

  updateForceVisualization = () => {};

  componentDidMount = () => {
    this.containerRef = d3.select(this.svgRef.current);
    this.force.on('tick', () => {
      this.containerRef.call(this.updateGraph);
    });
  };

  shouldComponentUpdate = nextProps => {
    this.containerRef = d3.select(this.svgRef.current);

    const d3Nodes = this.containerRef
      .selectAll('.node')
      .data(nextProps.nodes, node => node.key)

      .enter()
      .append('g')
      .call(this.enterNode)
      .exit()
      .remove()
      .call(this.updateNode);

    const d3Links = this.svgRef
      .selectAll('.link')
      .data(nextProps.links, link => link.key);
    d3Links
      .enter()
      .insert('line', '.node')
      .call(this.enterLink);
    d3Links.exit().remove();
    d3Links.call(this.updateLink);

    const mutableNodes = Object.assign({}, nextProps);
    this.force.nodes(mutableNodes.nodes).links(mutableNodes.links);

    return false;
  };

  componentDidUpdate = () => {
    //   this.force.nodes(this.getProcessedItemsData());
    //   this.force.on('tick', () => {
    //     console.log('tick 1');
    //     // this.updateVisualization()
    //   });
    //   // this.forceSimulationRef.on('tick', this.updateVisualization);
    //   // this.processForceSimulation();
    // this.updateVisualization();
  };

  render() {
    return (
      <svg
        ref={this.svgRef}
        height={this.props.height}
        width={this.props.width}
        viewBox={`0 0 ${this.props.width} ${this.props.height}`}
      />
    );
  }
}

Visualizer.propTypes = {
  behavior: PropTypes.string,
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
  behavior: 'sorted',
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
  behavior: visualizations.behavior,
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
