import React from 'react';
import PropTypes from 'prop-types';

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { reduxForm } from 'redux-form';

import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const MultiSelect = ({ items, memberIds, label, name, onChange }) => (
  <React.Fragment>
    <InputLabel htmlFor="select-multiple-checkbox">{label}</InputLabel>
    <Select
      multiple
      margin="dense"
      name={name}
      value={items
        .filter(({ id }) => memberIds.indexOf(id) > -1)
        .map(({ name }) => name)}
      onChange={onChange}
      label={label}
      input={<Input id="select-multiple-checkbox" />}
      renderValue={selected => selected.join(', ')}
      MenuProps={MenuProps}
      fullWidth
    >
      {items.map(({ name, id }) => (
        <MenuItem key={id} value={id}>
          <Checkbox checked={memberIds.indexOf(id) > -1} />
          <ListItemText primary={name} />
        </MenuItem>
      ))}
    </Select>
  </React.Fragment>
);

MultiSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  memberIds: PropTypes.array,
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func
};

MultiSelect.defaultProps = {
  label: 'Items',
  name: 'items',
  memberIds: [],
  items: [],
  onChange: () => {}
};

export default MultiSelect;
