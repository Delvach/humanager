import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { TABS } from '../constants/navigation';

import { changeTab } from '../actions/navigation';

const TabsNav = ({ changeTab, tab }) => {
  return (
    <div>
      <Tabs value={tab} onChange={(e, v) => changeTab(v)} centered>
        {TABS.map(({ title, value }) => (
          <Tab key={value} label={title} />
        ))}
      </Tabs>
    </div>
  );
};

const mapStateToProps = state => ({
  tab: state.navigation.tab
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeTab }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabsNav);
