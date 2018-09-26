import * as d3 from 'd3';

import React from 'react';

export const getForce = () => {
  let width = 1080,
    height = 250,
    enterNode = selection => {
      var circle = selection
        .select('circle')
        .attr('r', 25)
        .style('fill', 'tomato')
        .style('stroke', 'bisque')
        .style('stroke-width', '3px');

      selection.attr('key', node => `node-${node.id}`);

      selection
        .select('text')
        .style('fill', 'honeydew')
        .style('font-weight', '600')
        .style('text-transform', 'uppercase')
        .style('text-anchor', 'middle')
        .style('alignment-baseline', 'middle')
        .style('font-size', '10px')
        .style('font-family', 'cursive');
    },
    updateNode = selection => {
      selection
        .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
        .attr('cx', function(d) {
          return (d.x = Math.max(30, Math.min(width - 30, d.x)));
        })
        .attr('cy', function(d) {
          return (d.y = Math.max(30, Math.min(height - 30, d.y)));
        });
    },
    enterLink = selection => {
      selection.attr('stroke-width', 3).attr('stroke', 'bisque');
      selection.attr('key', d => `line-${d.lineID}`);
    },
    updateLink = selection => {
      selection
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
    },
    updateGraph = selection => {
      selection.selectAll('.node').call(updateNode);
      selection.selectAll('.link').call(updateLink);
    },
    color = d3.scaleOrdinal(d3.schemeCategory10),
    nsp = {},
    initForce = (nodes, links) => {
      nsp.force = d3
        .forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-200))
        .force('link', d3.forceLink(links).distance(70))
        .force(
          'center',
          d3
            .forceCenter()
            .x(nsp.width / 2)
            .y(nsp.height / 2)
        )
        .force('collide', d3.forceCollide([5]).iterations([5]));
    },
    setNodes = nodes => {
      nsp.force.nodes(nodes);
    },
    setLinks = links => {
      nsp.force.force('link', d3.forceLink(links).distance(70));
    },
    dragStarted = d => {
      if (!d3.event.active) nsp.force.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    },
    dragging = d => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    },
    dragEnded = d => {
      if (!d3.event.active) nsp.force.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    },
    tick = node => {
      var d3Graph = d3.select(node).select('svg');
      nsp.force.on('tick', () => {
        d3Graph.call(updateGraph);
      });
    };

  nsp.addDragHandlerToNode = function(node) {
    node.call(
      d3
        .drag()
        .on('start', dragStarted)
        .on('drag', dragging)
        .on('end', dragEnded)
    );
  };

  nsp.enterNode = enterNode;
  nsp.updateNode = updateNode;
  nsp.enterLink = enterLink;
  nsp.updateLink = updateLink;
  nsp.width = width;
  nsp.height = height;
  nsp.initForce = initForce;
  nsp.setNodes = setNodes;
  nsp.setLinks = setLinks;
  nsp.dragStarted = dragStarted;
  nsp.dragging = dragging;
  nsp.dragEnded = dragEnded;
  nsp.tick = tick;

  return nsp;
};
