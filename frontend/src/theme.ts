import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f44e08'
    },
    secondary: {
      main: '#ffd6c1'
    },
    background: {
      default: '#ffffff'
    },
    action: {
      active: '#ffad84'
    },
    info: {
      main: '#ab3d06'
    }
  }
});

export default theme;
