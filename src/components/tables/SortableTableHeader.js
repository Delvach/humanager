import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

import {
  TABLE_SORT_ASCENDING,
  TABLE_SORT_DESCENDING
} from '../../constants/navigation';
import { DEFAULT_VISUALIZATION_SORTBY_FILTER } from '../../constants/visualizations';

import { deleteHumanAction } from '../../actions/humans';
import { openEditingDialogAction } from '../../actions/navigation';

import {
  selectAllItemsAction,
  changeSortAction
} from '../../actions/navigation';

const TableSortableHeader = ({
  moduleId,
  handleSelectAllClick,
  sortByDirection,
  sortBy,
  numRowsSelected,
  rowCount,
  handleChangeSortBy,
  columns
}) => {
  const createSortHandler = property => event => {
    handleChangeSortBy(property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numRowsSelected > 0 && numRowsSelected < rowCount}
            checked={numRowsSelected === rowCount}
            onChange={event => handleSelectAllClick(event.target.checked)}
          />
        </TableCell>
        {moduleId === 'humans' && (
          <TableCell
            sortDirection={sortBy === 'color' ? sortByDirection : false}
          >
            <Tooltip title="Sort" placement={'bottom-start'} enterDelay={300}>
              <TableSortLabel
                active={sortBy === 'color'}
                direction={sortByDirection}
                onClick={createSortHandler('color')}
              >
                Avatar
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        )}
        {columns.map(column => (
          <TableCell
            key={column.value}
            numeric={column.numeric}
            //   padding={column.disablePadding ? 'none' : 'default'}
            sortDirection={sortBy === column.value ? sortByDirection : false}
          >
            <Tooltip
              title="Sort"
              placement={column.numeric ? 'bottom-end' : 'bottom-start'}
              enterDelay={300}
            >
              <TableSortLabel
                active={sortBy === column.value}
                direction={sortByDirection}
                onClick={createSortHandler(column.value)}
              >
                {column.label}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TableSortableHeader.propTypes = {
  moduleId: PropTypes.string,
  columns: PropTypes.array,
  rowCount: PropTypes.number,
  numRowsSelected: PropTypes.number,
  sortBy: PropTypes.string,
  sortByDirection: PropTypes.oneOf([
    TABLE_SORT_ASCENDING,
    TABLE_SORT_DESCENDING
  ])
};

TableSortableHeader.defaultProps = {
  moduleId: 'humans',
  columns: [],
  rowCount: 0,
  numRowsSelected: 0,
  sortBy: DEFAULT_VISUALIZATION_SORTBY_FILTER,
  sortByDirection: TABLE_SORT_ASCENDING
};

const mapStateToProps = ({ navigation, humans, roles }) => ({
  moduleId: navigation.tab !== 1 ? 'humans' : 'roles',
  sortBy: navigation.sortBy,
  sortByDirection: navigation.sortByDirection,
  numRowsSelected: navigation.listItemsSelected.length,
  rowCount: navigation.tab !== 1 ? humans.length : roles.length
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteItem: deleteHumanAction,
      editItem: openEditingDialogAction,
      handleChangeSortBy: changeSortAction,
      handleSelectAllClick: selectAllItemsAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSortableHeader);
