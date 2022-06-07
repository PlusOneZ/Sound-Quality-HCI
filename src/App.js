import * as React from 'react';

import Layout from "./pages/Layout";
import useMediaQuery from '@mui/material/useMediaQuery';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import getDesignTokens from './theme/themeColor';
import IntroPage from "./pages/Intro";

const ColorModeContext = React.createContext({
  toggleColorMode: () => {
  }
});

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'light');
  const colorMode = React.useMemo(
      () => ({
        // The dark mode switch would invoke this method
        toggleColorMode: () => {
          setMode((prevMode) =>
              prevMode === 'light' ? 'dark' : 'light',
          );
        },
      }),
      [],
  );

  const theme = React.useMemo(() =>
      createTheme(getDesignTokens(mode)), [mode]
  );

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Layout/>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
