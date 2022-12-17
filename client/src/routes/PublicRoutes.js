import React, { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { publicRouteCodes } from '../constants/RouteCodes';

const Products = lazy(() => import('../views/public/Products/Products'));

const PublicRoutes = () => (
  <Routes>
    <Route
        path={publicRouteCodes.HOME}
        element={<Navigate to={publicRouteCodes.PRODUCTS} replace />} />
    <Route path={publicRouteCodes.PRODUCTS} element={<Products/>} />
  </Routes>
);

export default PublicRoutes;
