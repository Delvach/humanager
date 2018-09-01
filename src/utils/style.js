export const getModalStyles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

export const getModalPositionStyle = (top = 50, left = 50) => ({
  top: `${top}%`,
  left: `${left}%`,
  transform: `translate(-${top}%, -${left}%)`
});
