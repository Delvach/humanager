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

import { deleteRoleAction } from '../../../actions/roles';
import { openEditingDialogAction } from '../../../actions/navigation';

import { ROLE_LIST_FIELDS } from '../../../constants/roles';

const TableHeader = () => (
  <TableHead>
    <TableRow>
      {ROLE_LIST_FIELDS.map(({ label, value }) => (
        <TableCell key={value}>{label}</TableCell>
      ))}
      <TableCell>Actions</TableCell>
    </TableRow>
  </TableHead>
);

const displayRoleField = ({ fieldValue, fieldId }, humans) => {
  if (fieldId !== 'members') return fieldValue;
  const memberHumans = humans.filter(({ id }) => fieldValue.indexOf(id) > -1);
  return memberHumans.map(({ name }) => name).join(' ,');
};

const RoleList = ({ deleteItem, editItem, roles, humans }) => {
  return (
    <Paper>
      <Table>
        <TableHeader />
        <TableBody>
          {roles.map(role => {
            const { id } = role;
            return (
              <TableRow key={id}>
                {ROLE_LIST_FIELDS.map(({ label, value }) => (
                  <TableCell key={value}>
                    {displayRoleField(
                      {
                        fieldValue: role[value],
                        fieldId: value
                      },
                      humans
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <Button onClick={() => editItem('roles', id)}>Edit</Button>
                  <Button onClick={() => deleteItem(id)}>Delete</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

RoleList.propTypes = {
  humans: PropTypes.array,
  roles: PropTypes.array
};

RoleList.defaultProps = {
  humans: [],
  roles: []
};

const mapStateToProps = ({ humans, roles }) => ({ humans, roles });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteItem: deleteRoleAction,
      editItem: openEditingDialogAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleList);
