import {blue, teal} from '@mui/material/colors';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
        ? {
          // palette values for light mode
          primary: teal,
          secondary: {
            ...teal,
          }
        }
        : {
          primary: {
            main: '#e65100'
          },
          secondary: {
            main: '#4a148c',
          },
        }),
  },
});

export default getDesignTokens;