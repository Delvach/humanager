import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classNames from 'classnames';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';

import { withStyles } from '@material-ui/core/styles';

import { lighten } from '@material-ui/core/styles/colorManipulator';

import { deleteSelectedItemsAction } from '../../actions/navigation';

import { TABS } from '../../constants/navigation';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    minHeight: 48
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
});

let EnhancedTableToolbar = ({
  numSelected,
  classes,
  title,
  handleDeleteClick
}) => (
  <Toolbar
    className={classNames(classes.root, {
      [classes.highlight]: numSelected > 0
    })}
  >
    <div className={classes.title}>
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subheading">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography variant="title" id="tableTitle">
          {title}
        </Typography>
      )}
    </div>
    <div className={classes.spacer} />
    <div className={classes.actions}>
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteClick} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.object,
  numSelected: PropTypes.number,
  tab: PropTypes.number
};

EnhancedTableToolbar.defaultProps = {
  title: 'List',
  numSelected: 0,
  tab: 0
};

const mapStateToProps = ({ navigation, humans, visualizations }) => ({
  numSelected: navigation.listItemsSelected.length,
  title: TABS[navigation.tab].title,
  tab: navigation.tab
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleDeleteClick: deleteSelectedItemsAction
    },
    dispatch
  );

EnhancedTableToolbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(EnhancedTableToolbar);

export default withStyles(toolbarStyles)(EnhancedTableToolbar);
