import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import ListItem from '@material-ui/core/ListItem';
import Switch from '@material-ui/core/Switch';

import { changeSortByAction } from '../../actions/visualizations';

import {
  VISUALIZATION_SORTBY_FILTERS,
  DEFAULT_VISUALIZATION_SORTBY_FILTER
} from '../../constants/visualizations';

const VisualizationFilters = ({ sortBy, handleChangeSortBy }) => {
  return (
    <FormControl component="fieldset">
      <ListItem>
        <FormLabel component="legend">Sort By</FormLabel>
      </ListItem>
      <FormGroup>
        {VISUALIZATION_SORTBY_FILTERS.map(({ label, value }) => (
          <ListItem
            key={`filter-${value}`}
            style={{ paddingTop: 6, paddingBottom: 6 }}
          >
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
  sortBy: DEFAULT_VISUALIZATION_SORTBY_FILTER.value
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
