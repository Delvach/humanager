import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Logo from '../assets/Logo';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HumansIcon from '@material-ui/icons/People';
import RolesIcon from '@material-ui/icons/List';

import { TABS } from '../../constants/navigation';

import {
  changeTab,
  openLeftDrawerAction,
  closeLeftDrawerAction
} from '../../actions/navigation';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
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
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

const Sidebar = props => {
  const {
    anchor,
    children,
    classes,
    theme,
    open,
    changeTab,
    handleDrawerClose,
    handleDrawerOpen,
    tab,
    variant
  } = props;

  return (
    <div className={classes.root}>
      <AppBar
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
      </AppBar>

      <Drawer
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !open && classes.drawerPaperClose
          )
        }}
        variant={variant}
        anchor={anchor}
        open={open}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            {TABS.map(({ title, value }) => (
              <ListItem
                onClick={() => {
                  changeTab(value);
                }}
                selected={value === tab}
                button
              >
                <ListItemIcon>
                  {value === 0 ? <HumansIcon /> : <RolesIcon />}
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
            ))}
          </div>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

Sidebar.propTypes = {
  anchor: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  open: PropTypes.bool,
  tab: PropTypes.number,
  variant: PropTypes.string
};

Sidebar.defaultProps = {
  anchor: 'left',
  children: '',
  open: false,
  tab: 0,
  variant: 'permanent'
};

const mapStateToProps = ({ navigation }) => ({
  open: navigation.leftDrawerOpen,
  tab: navigation.tab
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleDrawerClose: closeLeftDrawerAction,
      handleDrawerOpen: openLeftDrawerAction,
      changeTab
    },
    dispatch
  );

const SidebarWrapped = withStyles(styles, { withTheme: true })(Sidebar);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarWrapped);
