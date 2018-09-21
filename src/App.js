import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';

import { initApp } from './actions';

import SplitPane from 'react-split-pane';

import './App.css';

import AppBar from './components/layout/Appbar';
import Contents from './components/layout/Contents';
import Drawer from './components/layout/Drawer';

import CreateEditDialog from './components/dialogs/DialogForm';

import ModuleView from './components/modules/ModuleView';

import ItemsList from './components/tables/ItemsList';
import AboutApplication from './components/modules/about/AboutApplication';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './themes/default';

import {
  resizeHandlerAction,
  triggerVisualizationResizeAction
} from './actions/navigation';

import HumansVisualizer from './components/modules/humans/HumansVisualizer';

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
  <ModuleView>
    <ItemsList />
  </ModuleView>
);
const Roles = () => (
  <ModuleView>
    <ItemsList />
  </ModuleView>
);

const About = () => (
  <ModuleView>
    <AboutApplication />
  </ModuleView>
);

class App extends Component {
  componentDidMount = () => {
    this.props.initApp();
    window.addEventListener('resize', this.updateAppSize);

    // Without an immediate resize, visualization does not recalculate dimensions relative to drawer status
    this.props.windowResizeHandler();
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateAppSize);
  }

  updateAppSize = e => {
    this.props.windowResizeHandler();
  };

  tabViews = idx => [<Humans />, <Roles />, <About />][idx];

  render() {
    return (
      <MuiThemeProvider theme={this.props.theme}>
        <div className="App">
          <CreateEditDialog />

          <div className={this.props.classes.root}>
            <AppBar />
            <Drawer />
            <Contents>
              <SplitPane
                split="horizontal"
                minSize={200}
                defaultSize={this.props.defaultTopPaneHeight}
                onChange={this.props.resizeHandler}
                style={{
                  width: 'auto',
                  height: 'auto',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexGrow: 1,
                    marginTop: '65px'
                  }}
                >
                  {this.tabViews(this.props.tab)}
                </div>

                <div
                  style={{
                    display: 'block',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    flexGrow: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                    alignContent: 'stretch'
                  }}
                >
                  <HumansVisualizer />
                </div>
              </SplitPane>
            </Contents>
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
  defaultTopPaneHeight: navigation.topPaneHeight,
  theme
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      initApp,
      resizeHandler: resizeHandlerAction,
      windowResizeHandler: triggerVisualizationResizeAction
    },
    dispatch
  );

const AppWrapped = withStyles(styles, { withTheme: true })(App);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWrapped);
