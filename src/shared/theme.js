import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e35c5e',
    },
    secondary: {
      main: '#a98be3',
      contrastText: '#1d1827',
    },
    background: {
      default: '#34373f',
      paper: '#23262e',
    },
    text: {
      primary: '#a5a6b2',
    },
  },
});
