import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddPersonIcon from '@material-ui/icons/PersonAdd';
import AddRoleIcon from '@material-ui/icons/GroupAdd';
import AppBarComponent from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

import Logo from '../assets/Logo';

import {
  openLeftDrawerAction,
  openCreationDialogAction
} from '../../actions/navigation';

import { storeLeftDrawerOpenPreferenceAction } from '../../actions/preferences';

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
  extendedIcon: {
    marginRight: theme.spacing.unit
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
  },

  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
});

const AddIcon = ({ tab, ...props }) =>
  tab === 0 ? <AddPersonIcon {...props} /> : <AddRoleIcon {...props} />;

const AppBar = props => {
  const {
    classes,
    open,
    handleDrawerOpen,
    storeDrawerOpenStatus,
    openCreationDialog,
    tab
  } = props;

  return (
    <AppBarComponent
      position="absolute"
      className={classNames(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar disableGutters={!open}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={() => {
            handleDrawerOpen();
            storeDrawerOpenStatus(true);
          }}
          className={classNames(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Logo />
        <Typography
          variant="title"
          color="inherit"
          className={classes.grow}
          noWrap
        >
          Humanager
        </Typography>
        <Button
          color="inherit"
          onClick={() => {
            openCreationDialog(tab === 0 ? 'humans' : 'roles');
          }}
        >
          <AddIcon className={classes.extendedIcon} />
          Create {tab === 0 ? 'Human' : 'Role'}
        </Button>
      </Toolbar>
    </AppBarComponent>
  );
};

AppBar.propTypes = {
  open: PropTypes.bool,
  tab: PropTypes.number
};

AppBar.defaultProps = {
  open: false,
  tab: 0
};

const mapStateToProps = ({ navigation }) => ({
  open: navigation.leftDrawerOpen,
  tab: navigation.tab
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleDrawerOpen: openLeftDrawerAction,
      storeDrawerOpenStatus: storeLeftDrawerOpenPreferenceAction,
      openCreationDialog: openCreationDialogAction
    },
    dispatch
  );

const AppBarWrapped = withStyles(styles, { withTheme: true })(AppBar);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBarWrapped);
