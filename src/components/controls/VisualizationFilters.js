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

import { VISUALIZATION_SORTBY_FILTERS } from '../../constants/visualizations';

const VisualizationFilters = ({ sortBy, handleChangeSortBy }) => {
  return (
    <FormControl component="fieldset">
      <FormGroup>
        {VISUALIZATION_SORTBY_FILTERS.map(({ label, value }) => (
          <ListItem key={`filter-${value}`}>
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
