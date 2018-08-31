import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';

// Currently using default theme- determine good color palette
export default createMuiTheme({
  palette: {
    type: 'light',
    primary: indigo,
    secondary: pink
  }
});
