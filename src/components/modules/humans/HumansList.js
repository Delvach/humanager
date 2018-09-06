import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from './../../inputs/Button';

import { deleteHumanAction } from '../../../actions/humans';
import { openEditingDialogAction } from '../../../actions/navigation';

import { HUMAN_LIST_FIELDS } from '../../../constants/humans';

const TableHeader = () => (
  <TableHead>
    <TableRow>
      {HUMAN_LIST_FIELDS.map(({ label, value }) => (
        <TableCell key={value}>{label}</TableCell>
      ))}
      <TableCell>Actions</TableCell>
    </TableRow>
  </TableHead>
);

const HumanList = ({ deleteItem, editItem, humans }) => (
  <Paper>
    <Table>
      <TableHeader />
      <TableBody>
        {humans.map(human => {
          const { id } = human;
          return (
            <TableRow key={id}>
              {HUMAN_LIST_FIELDS.map(({ value }) => (
                <TableCell key={value}>{human[value]}</TableCell>
              ))}
              <TableCell>
                <Button onClick={() => editItem(id)}>Edit</Button>
                <Button onClick={() => deleteItem(id)}>Delete</Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </Paper>
);

HumanList.propTypes = {
  humans: PropTypes.array
};

HumanList.defaultProps = {
  humans: []
};

const mapStateToProps = ({ humans }) => ({ humans });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteItem: deleteHumanAction,
      editItem: openEditingDialogAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HumanList);
