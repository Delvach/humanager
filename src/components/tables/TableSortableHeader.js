import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { HUMAN_LIST_FIELDS } from '../../../constants/humans';

const TableSortableHeader = ({
  onSelectAllClick,
  sortDirection,
  sortBy,
  numSelected,
  rowCount,
  sortEventHandler
}) => {
  const createSortHandler = property => event => {
    sortEventHandler(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {HUMAN_LIST_FIELDS.map(row => {
          return (
            <TableCell
              key={row.id}
              numeric={row.numeric}
              //   padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={sortBy === row.id ? sortDirection : false}
            >
              <Tooltip
                title="Sort"
                placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={sortBy === row.id}
                  direction={sortDirection}
                  onClick={this.createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
};

TableSortableHeader.propTypes = {
  items: PropTypes.array,
  sortBy: PropTypes.string
};

TableSortableHeader.defaultProps = {
  items: [],
  sortBy: DEFAULT_VISUALIZATION_SORTBY_FILTER
};

const mapStateToProps = ({ humans, visualizations }) => ({
  items: humans,
  sortBy: visualizations.sortBy
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteItem: deleteHumanAction,
      editItem: openEditingDialogAction,
      handleChangeSortBy: changeSortByAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSortableHeader);
