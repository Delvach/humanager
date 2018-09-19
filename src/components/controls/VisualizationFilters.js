import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';
import Switch from '@material-ui/core/Switch';

import { changeSortByAction } from '../../actions/visualizations';

const humansFilters = [
  { label: 'Random', value: 'random' },
  { label: 'Name', value: 'name' },
  { label: 'Age', value: 'age' }
];

const VisualizationFilters = ({ sortBy, handleChangeSortBy }) => {
  return (
    <FormControl component="fieldset">
      <FormGroup>
        {humansFilters.map(({ label, value }) => (
          <ListItem>
            <FormControlLabel
              control={
                <Switch
                  checked={sortBy === value}
                  onChange={() => {
                    handleChangeSortBy(value);
                  }}
                  value={value}
                />
              }
              label={label}
            />
          </ListItem>
        ))}
      </FormGroup>
    </FormControl>
  );
};

VisualizationFilters.propTypes = {
  sortBy: PropTypes.string
};

VisualizationFilters.defaultProps = {
  sortBy: 'random'
};

const mapStateToProps = ({ visualizations }) => ({
  sortBy: visualizations.sortBy
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeSortBy: changeSortByAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizationFilters);
