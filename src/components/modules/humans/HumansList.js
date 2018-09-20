import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from './../../inputs/Button';

import { deleteHumanAction } from '../../../actions/humans';
import { openEditingDialogAction } from '../../../actions/navigation';

import { HUMAN_LIST_FIELDS } from '../../../constants/humans';

import { DEFAULT_VISUALIZATION_SORTBY_FILTER } from '../../../constants/visualizations';

import {
  changeSortByAction,
  getSortedItems
} from '../../../actions/visualizations';

const HumanList = ({
  deleteItem,
  editItem,
  humans,
  sortBy,
  handleChangeSortBy
}) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Avatar</TableCell>
        {HUMAN_LIST_FIELDS.map(({ label, value }) => (
          <TableCell
            key={value}
            style={{
              cursor: 'pointer',
              fontWeight: sortBy.value === value ? 'bold' : 'normal'
            }}
            onClick={() => {
              handleChangeSortBy(value);
            }}
          >
            {label}
          </TableCell>
        ))}
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {getSortedItems(humans, sortBy).map(human => {
        const { id, name, avatar } = human;
        return (
          <TableRow key={id}>
            <TableCell>
              <img alt={`Avatar for ${name}`} src={avatar} />
            </TableCell>
            {HUMAN_LIST_FIELDS.map(({ value }) => (
              <TableCell key={value}>{human[value]}</TableCell>
            ))}
            <TableCell>
              <Button onClick={() => editItem('humans', id)}>Edit</Button>
              <Button onClick={() => deleteItem(id)}>Delete</Button>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);

HumanList.propTypes = {
  humans: PropTypes.array,
  sortBy: PropTypes.string
};

HumanList.defaultProps = {
  humans: [],
  sortBy: DEFAULT_VISUALIZATION_SORTBY_FILTER
};

const mapStateToProps = ({ humans, visualizations }) => ({
  humans,
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
)(HumanList);
