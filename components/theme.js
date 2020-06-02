import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#bbbbdd',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#ff4f4f',
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
