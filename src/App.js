import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initApp } from './actions';
// import { changeTab } from './actions/navigation';

import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import TabsNav from './components/TabsNav';
import EditHumanModal from './components/modals/human';
import HumansView from './modules/HumansView';
import RolesView from './modules/RolesView';

class App extends Component {
  componentDidMount = () => this.props.initApp();

  tabViews = idx => {
    return [<HumansView />, <RolesView />, <div>Item Three</div>][idx];
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <EditHumanModal />
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Humanager
              </Typography>
            </Toolbar>
          </AppBar>
          <TabsNav />
          {this.tabViews(this.props.tab)}
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ navigation }) => ({
  tab: navigation.tab
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ initApp }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
