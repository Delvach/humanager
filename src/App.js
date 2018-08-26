import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initApp } from './actions';
import { changeTab } from './actions/navigation';

import './App.css';

import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import TabsNav from './components/TabsNav';
import EditHumanModal from './components/EditHumanModal';
import HumansView from './modules/HumansView';
import RolesView from './modules/RolesView';

class App extends Component {
  componentDidMount = () => this.props.initApp();
  onTabChange = val => this.props.changeTab(val);

  tabViews = idx => {
    return [<HumansView />, <RolesView />, <div>Item Three</div>][idx];
  };

  render() {
    return (
      <div className="App">
        <EditHumanModal />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Humanager
            </Typography>
          </Toolbar>
        </AppBar>
        <TabsNav
          tab={this.props.tab}
          onTabChange={this.onTabChange}
          createHuman={this.onCreateHuman}
        />
        {this.tabViews(this.props.tab)}
      </div>
    );
  }
}

function mapStateToProps({ navigation }) {
  return {
    editHumanModalOpen: navigation.editHumanModalOpen,
    tab: navigation.tab,
    tabs: navigation.tabs
  };
}

const mapDispatchToProps = dispatch => ({
  initApp: () => dispatch(initApp()),
  changeTab: tab => dispatch(changeTab(tab))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
