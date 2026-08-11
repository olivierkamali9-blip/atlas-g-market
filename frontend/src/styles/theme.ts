import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2f4f7f', // Slate
    },
    secondary: {
      main: '#3e8e41', // Emerald
    },
  },
  typography: {
    fontFamily: 'Open Sans',
  },
});

export default theme;