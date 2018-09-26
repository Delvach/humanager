import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

import {
  openEditingDialogAction,
  handleListItemClickAction
} from '../../../actions/navigation';

import { TABLE_SORT_ASCENDING } from '../constants/navigation';
import { HUMAN_LIST_FIELDS } from '../../../constants/humans';
import { ROLE_LIST_FIELDS } from '../../../constants/roles';
import { DEFAULT_VISUALIZATION_SORTBY_FILTER } from '../../../constants/visualizations';

import { getSortedItems } from '../../../utils/data';

import TableHeader from '../../tables/SortableTableHeader';
import EnhancedTableToolbar from '../../controls/EnhancedTableToolbar';

const styles = {
  root: {
    width: '100%'
  },
  hover: {
    cursor: 'pointer'
  }
};

let ItemsList = ({
  classes,
  itemFields,
  editItem,
  clickRow,
  items,
  sortBy,
  sortByDirection,
  selectedItems
}) => (
  <Paper className={classes.root}>
    <div>
      <EnhancedTableToolbar numSelected={0} />
    </div>
    <Table padding="dense">
      <TableHeader columns={itemFields} />

      <TableBody>
        {getSortedItems({
          items,
          sortBy,
          ascending: sortByDirection === TABLE_SORT_ASCENDING
        }).map(item => {
          const { id, avatar, name } = item;
          const selected = selectedItems.indexOf(id) !== -1;
          return (
            <TableRow
              className={classes.hover}
              hover
              onClick={event => {
                if (event.target.type !== 'checkbox') {
                  editItem('humans', id);
                }
              }}
              key={id}
              selected={selected}
              aria-checked={selected}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  onClick={event => {
                    clickRow(id);
                  }}
                  checked={selected}
                />
              </TableCell>
              <TableCell>
                <img
                  height={32}
                  width={32}
                  alt={`Avatar for ${name}`}
                  src={avatar}
                />
              </TableCell>
              {itemFields.map(({ value, numeric }) => (
                <TableCell numeric={numeric} key={value}>
                  {item[value]}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </Paper>
);

ItemsList.propTypes = {
  items: PropTypes.array,
  itemFields: PropTypes.array,
  sortBy: PropTypes.string,
  selectedItems: PropTypes.array
};

ItemsList.defaultProps = {
  items: [],
  itemFields: [],
  sortBy: DEFAULT_VISUALIZATION_SORTBY_FILTER,
  selectedItems: []
};

const mapStateToProps = ({ humans, navigation, roles }) => ({
  items: navigation.tab !== 1 ? humans : roles,
  itemFields: navigation.tab !== 1 ? HUMAN_LIST_FIELDS : ROLE_LIST_FIELDS,
  sortBy: navigation.sortBy,
  sortByDirection: navigation.sortByDirection,
  selectedItems: navigation.listItemsSelected
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editItem: openEditingDialogAction,
      clickRow: handleListItemClickAction
    },
    dispatch
  );

ItemsList = withStyles(styles)(ItemsList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsList);
