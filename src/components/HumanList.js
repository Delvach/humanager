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
import Button from '@material-ui/core/Button';

import { deleteHumanAction } from '../actions/humans';
import { toggleHumanModalStatusAction } from '../actions/navigation';

const HumanList = ({ deleteHuman, editHuman, humans }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Username</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Age</TableCell>
          <TableCell numeric>ID</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {humans.map(({ username, email, age, id }) => (
          <TableRow key={id}>
            <TableCell>{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{age}</TableCell>
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
      deleteHuman: deleteHumanAction,
      editHuman: toggleHumanModalStatusAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HumanList);
