import { CssBaseline, ThemeProvider } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Eudaimonia from './game/Eudaimonia';
import { darkTheme, lightTheme } from './shared/theme';

export default function App() {
  const theme = useSelector((state) => state.theme);

  const getRoutes = () => (
    <BrowserRouter>
      <Routes>
        <Route index path="*" element={<Eudaimonia />} />
      </Routes>
    </BrowserRouter>
  );

  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
      <CssBaseline enableColorScheme />
      {getRoutes()}
    </ThemeProvider>
  );
}
