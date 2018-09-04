import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import blue from '@material-ui/core/colors/blue';

// Currently using default theme- determine good color palette
export default createMuiTheme({
  palette: {
    type: 'light',
    primary: deepPurple,
    secondary: blue
  }
});
