import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TABLE_SORT_ASCENDING } from '../../constants/navigation';

import {
  ITEM_VISUAL_SETTINGS,
  TRANSITION_DURATIONS,
  TRANSITION_DELAYS
} from '../../constants/visualizations';

import { selectItemAction } from '../../actions/visualizations';
import { getSortedItems } from '../../utils/data';
import { Items } from '../../utils/items';
// import classNames from 'classnames';

import * as d3 from 'd3';

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.visualRef = React.createRef();

    // this.props.behavior,
    //   this.props.items,
    //   this.props.selectedItemId,
    //   this.props.sortBy,
    //   this.props.sortByDirection,
    //   this.props.listItemsSelected;

    const { behavior, items, sortBy, height, width } = props;

    const propSettings = {
      behavior: behavior,
      numItems: items.length,
      areaHeight: height,
      areaWidth: width,
      ascending: this.props.sortByDirection === TABLE_SORT_ASCENDING
    };

    this.tools = Items(
      this.props.width,
      this.props.height,
      propSettings,
      ITEM_VISUAL_SETTINGS,
      TRANSITION_DURATIONS,
      TRANSITION_DELAYS
    );
  }

  prepareItemsForDisplay = (
    behavior = null,
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

    return getSortedItems({
      behavior,
      items: updatedItems,
      sortBy,
      ascending: sortByDirection === TABLE_SORT_ASCENDING
    });
  };

  /* 
   * Implementing d3 general update pattern
   */
  updateVisualization = function() {
    const displayData = this.prepareItemsForDisplay(
      this.props.behavior,
      this.props.items,
      this.props.selectedItemId,
      this.props.sortBy,
      this.props.sortByDirection,
      this.props.listItemsSelected
    );

    // Step 1 - Grab collection of containers (or automagically create later)
    const itemsGroups = d3
      .select(this.visualRef.current)
      .on('click', e => {
        this.props.selectItem();
      })
      .selectAll('g')
      .data(displayData, h => `item-${h.id}`);

    this.tools.updateGroup(itemsGroups);

    this.tools.enterGroup(itemsGroups);
    this.tools.reorderGroup(this.props.behavior, itemsGroups);
    this.tools.exitGroup(itemsGroups);
  };

  componentDidUpdate = function() {
    const { behavior, items, height, width } = this.props;

    this.tools.updateSettings({
      behavior,
      numItems: items.length,
      areaHeight: height,
      areaWidth: width,
      ascending: this.props.sortByDirection === TABLE_SORT_ASCENDING
    });
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
  behavior: PropTypes.string,
  items: PropTypes.array,
  selectedItemId: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  itemSizeBase: PropTypes.number,
  itemSizeActive: PropTypes.number,
  sortBy: PropTypes.string
};

Visualizer.defaultProps = {
  behavior: 'sorted',
  items: [],
  selectedItemId: null,
  height: 100,
  width: 100,
  itemSizeBase: 32,
  itemSizeActive: 48,
  sortBy: 'name'
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
  listItemsSelected: navigation.listItemsSelected
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectItem: selectItemAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visualizer);
