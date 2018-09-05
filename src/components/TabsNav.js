import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { TABS } from '../constants/navigation';

import { changeTab } from '../actions/navigation';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

const TabsNav = ({ classes, changeTab, tab }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={tab} onChange={(e, v) => changeTab(v)} centered>
          {TABS.map(({ title, value }) => (
            <Tab key={value} label={title} />
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
};

TabsNav.propTypes = {
  tab: PropTypes.number
};

TabsNav.defaultProps = {
  tab: 0
};

const mapStateToProps = state => ({
  tab: state.navigation.tab
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeTab }, dispatch);

const TabsNavWrapped = withStyles(styles)(TabsNav);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabsNavWrapped);
