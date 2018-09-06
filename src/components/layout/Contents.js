import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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

const Contents = ({ children, classes }) => (
  <main className={classes.content}>
    <div className={classes.toolbar} />
    <div>{children}</div>
  </main>
);

Contents.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ])
};

Contents.defaultProps = {
  children: ''
};

export default withStyles(styles, { withTheme: true })(Contents);
