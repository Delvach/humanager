import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  mainContents: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0
    }
  },
  root: {
    display: 'flex',
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    overflow: 'scroll'
  },
  bodyText: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 4
  }
});

const AboutApplication = props => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item md={10}>
          <div className={classes.mainContents}>
            <Typography variant="display2" color="inherit" gutterBottom>
              Humanager
            </Typography>
            <Typography variant="headline" color="inherit" paragraph>
              A data visualization project by Ben Del Vacchio
            </Typography>
            <Typography variant="title" color="inherit">
              What is this?
            </Typography>
            <Typography
              variant="body2"
              color="inherit"
              className={classes.bodyText}
            >
              Humanager is a small project I'm working on as an exercise in web
              development. It visualizes individuals and roles, currently in
              fairly primitive ways, but with additional features in the
              pipeline.
            </Typography>
            <Typography variant="title" color="inherit">
              What is Humanager's purpose?
            </Typography>
            <Typography
              variant="body2"
              color="inherit"
              className={classes.bodyText}
            >
              Learning the names, faces and roles in any growing organization
              can present challenges. I've always wanted a tool that makes it
              easy to identify people I'm coordinating or working with without
              having to rely on their Slack profile or looking them up on
              linkedin. When 'complete', Humanager will provide a convenient
              means to identify people by name, face, department, title, etc. It
              is designed around humans instead of users because it's not tied
              to a specific user base; it could be showing dogs, so even 'human'
              data is a bit too specific and future naming convensions may
              change.
            </Typography>

            <Typography variant="title" color="inherit">
              What technologies are employed?
            </Typography>
            <Typography
              variant="body2"
              color="inherit"
              className={classes.bodyText}
            >
              The core technologies are React, redux, redux-saga, and d3. Data
              is stored in Firebase using CRUD (create, read, update, delete)
              operations with redux-saga. Data is currently <em>not</em> secure
              with anonymous authentication employed for the sole purpose of
              generating unique ID's for the current session. Please do not
              enter real emails or any private information! Randomized icons are
              currently being provided by{' '}
              <a href="http://avatars.adorable.io" target="blank">
                Adorable Avatars
              </a>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

AboutApplication.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(AboutApplication);
