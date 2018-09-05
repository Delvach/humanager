import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initApp } from './actions';

import './App.css';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import TabsNav from './components/TabsNav';
import EditHumanModal from './components/dialogs/HumanDialog';
import HumansView from './modules/HumansView';
import RolesView from './modules/RolesView';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './themes/default';

import Logo from './components/assets/Logo';

class App extends Component {
  componentDidMount = () => this.props.initApp();

  tabViews = idx => {
    return [<HumansView />, <RolesView />, <div>Item Three</div>][idx];
  };

  render() {
    return (
      <MuiThemeProvider theme={this.props.theme}>
        <div className="App">
          <EditHumanModal />
          <AppBar position="static">
            <Toolbar>
              <Logo />
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

App.propTypes = {
  tab: PropTypes.number,
  theme: PropTypes.object
};

App.defaultProps = {
  tab: 0,
  theme: {}
};

// type Props = {
//   message: string | number | Message,
// };

const mapStateToProps = ({ navigation }) => ({
  tab: navigation.tab,
  theme
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ initApp }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
