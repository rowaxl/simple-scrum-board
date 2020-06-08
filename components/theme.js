import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8cd5fa',
    },
    secondary: {
      main: '#9c7aff',
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
