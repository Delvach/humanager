import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { TABS } from '../constants/navigation';

class TabsNav extends Component {
  onChange = (e, val) => {
    this.props.onTabChange(val);
  };

  render() {
    return (
      <div>
        <Tabs value={this.props.tab} onChange={this.onChange} centered>
          {TABS.map(({ title, value }) => (
            <Tab key={value} label={title} />
          ))}
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tab: state.navigation.tab
  };
}

export default connect(mapStateToProps)(TabsNav);
