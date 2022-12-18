import { CssBaseline } from '@mui/material';
import { makeStyles, ThemeProvider } from '@mui/styles';
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import darkMaterialTheme from './constants/theme/Theme';
import PublicRoutes from './routes/PublicRoutes';


const useStyles = makeStyles(() => ({
  '@global': {
    html: {
      height: '100%',
    },
    body: {
      height: '100%',
    },
    '#root': {
      height: '100%',
    },
  },
}));


const App = () => {
  useStyles();
  return (

  <Suspense fallback={<div />}>
    <ThemeProvider theme={darkMaterialTheme}>
      <CssBaseline />
      <BrowserRouter>
        <PublicRoutes/>
      </BrowserRouter>
    </ThemeProvider>
  </Suspense>
  );
}

export default App;
