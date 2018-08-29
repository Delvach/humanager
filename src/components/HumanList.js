import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import Human from './Human';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import { deleteHumanAction } from '../actions/humans';
import { toggleHumanModalStatusAction } from '../actions/navigation';

const HumanList = ({ deleteHuman, editHuman, humans }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell numeric>ID</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {humans.map(({ name, id }) => (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell numeric>{id}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={() => editHuman(true, id)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => deleteHuman(id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

const mapStateToProps = ({ humans }) => ({ humans });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteHuman: deleteHumanAction,
      editHuman: toggleHumanModalStatusAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HumanList);
