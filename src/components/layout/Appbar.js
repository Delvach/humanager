import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import IconButton from '@material-ui/core/IconButton';
import AppBarComponent from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

import Logo from '../assets/Logo';

import { openLeftDrawerAction } from '../../actions/navigation';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  }
});

const AppBar = props => {
  const { classes, open, handleDrawerOpen } = props;

  return (
    <AppBarComponent
      position="absolute"
      className={classNames(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar disableGutters={!open}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={handleDrawerOpen}
          className={classNames(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Logo />
        <Typography variant="title" color="inherit" noWrap>
          Humanager
        </Typography>
      </Toolbar>
    </AppBarComponent>
  );
};

AppBar.propTypes = {
  open: PropTypes.bool
};

AppBar.defaultProps = {
  open: false
};

const mapStateToProps = ({ navigation }) => ({
  open: navigation.leftDrawerOpen
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleDrawerOpen: openLeftDrawerAction
    },
    dispatch
  );

const AppBarWrapped = withStyles(styles, { withTheme: true })(AppBar);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBarWrapped);
