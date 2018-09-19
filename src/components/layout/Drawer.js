import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HumansIcon from '@material-ui/icons/People';
import RolesIcon from '@material-ui/icons/List';

import { TABS } from '../../constants/navigation';

import VisualizationFilters from '../controls/VisualizationFilters';

import {
  changeTabAction,
  closeLeftDrawerAction,
  triggerVisualizationResizeAction
} from '../../actions/navigation';

import {
  storeTabPreferenceAction,
  storeLeftDrawerOpenPreferenceAction
} from '../../actions/preferences';

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
  }
});

const Sidebar = props => {
  const {
    anchor,
    classes,
    theme,
    open,
    changeTab,
    storeTab,
    handleDrawerClose,
    triggerVisualizationResizeAction,
    storeLeftDrawerOpen,
    tab,
    variant
  } = props;

  return (
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
        <IconButton
          onClick={() => {
            handleDrawerClose();
            storeLeftDrawerOpen(false);
            triggerVisualizationResizeAction();
          }}
        >
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
                storeTab(value);
              }}
              key={value}
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
        <Divider />
        <VisualizationFilters />
      </List>

      <Divider />
    </Drawer>
  );
};

Sidebar.propTypes = {
  anchor: PropTypes.string,
  open: PropTypes.bool,
  tab: PropTypes.number,
  variant: PropTypes.string
};

Sidebar.defaultProps = {
  anchor: 'left',
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
      storeLeftDrawerOpen: storeLeftDrawerOpenPreferenceAction,
      changeTab: changeTabAction,
      storeTab: storeTabPreferenceAction,
      triggerVisualizationResizeAction
    },
    dispatch
  );

const SidebarWrapped = withStyles(styles, { withTheme: true })(Sidebar);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarWrapped);
