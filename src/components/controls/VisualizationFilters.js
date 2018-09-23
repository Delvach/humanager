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

import BubbleChartIcon from '@material-ui/icons/BubbleChart';

import { changeVisualizationBehaviorAction } from '../../actions/visualizations';

import {
  VISUALIZATION_BEHAVIORS,
  DEFAULT_VISUALIZATION_BEHAVIOR
} from '../../constants/visualizations';

const VisualizationFilters = ({
  behavior,
  handleChangeBehavior,
  drawerOpen
}) => {
  return (
    <FormControl component="fieldset">
      <ListItem>
        <FormLabel component="legend">
          <BubbleChartIcon /> {drawerOpen && 'Behavior'}
        </FormLabel>
      </ListItem>
      <FormGroup>
        {VISUALIZATION_BEHAVIORS.map(({ label, value }) => (
          <ListItem
            key={`filter-${value}`}
            style={{ paddingTop: 6, paddingBottom: 6 }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={behavior === value}
                  onChange={() => {
                    handleChangeBehavior(value);
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
  behavior: PropTypes.string,
  drawerOpen: PropTypes.bool
};

VisualizationFilters.defaultProps = {
  behavior: DEFAULT_VISUALIZATION_BEHAVIOR.value,
  drawerOpen: true
};

const mapStateToProps = ({ navigation, visualizations }) => ({
  behavior: visualizations.behavior,
  drawerOpen: navigation.leftDrawerOpen
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeBehavior: changeVisualizationBehaviorAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualizationFilters);
