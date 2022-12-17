import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';

const App = () => {
 
  return (

  <Suspense fallback={<div />}>
    <BrowserRouter>
      <PublicRoutes/>
    </BrowserRouter>
  </Suspense>
  );
}

export default App;
