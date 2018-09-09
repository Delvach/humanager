import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';

import { initApp } from './actions';

import './App.css';

import AppBar from './components/layout/Appbar';
import Contents from './components/layout/Contents';
import Drawer from './components/layout/Drawer';

import CreateEditDialog from './components/dialogs/DialogForm';

import ModuleView from './components/modules/ModuleView';

import HumansList from './components/modules/humans/HumansList';
import RolesList from './components/modules/roles/RolesList';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './themes/default';

const styles = theme => ({
  root: {
    flexGrow: 1,
    flexShrink: 0,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  }
});

const Humans = () => (
  <ModuleView moduleId="humans">
    <HumansList />
  </ModuleView>
);
const Roles = () => (
  <ModuleView moduleId="roles">
    <RolesList />
  </ModuleView>
);

class App extends Component {
  componentDidMount = () => this.props.initApp();

  tabViews = idx => [<Humans />, <Roles />][idx];

  render() {
    return (
      <MuiThemeProvider theme={this.props.theme}>
        <div className="App">
          <CreateEditDialog />
          <div className={this.props.classes.root}>
            <AppBar />
            <Drawer />
            <Contents>{this.tabViews(this.props.tab)}</Contents>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  tab: PropTypes.number,
  theme: PropTypes.object
};

App.defaultProps = {
  tab: 0,
  theme: {}
};

const mapStateToProps = ({ navigation }) => ({
  tab: navigation.tab,
  theme
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ initApp }, dispatch);

const AppWrapped = withStyles(styles, { withTheme: true })(App);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWrapped);
