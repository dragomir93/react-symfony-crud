import React, { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { publicRouteCodes } from '../constants/RouteCodes';
import PublicTemplates from '../templates/PublicTemplates';

const Products = lazy(() => import('../views/public/Products/Products'));

const PublicRoutes = () => (
  <PublicTemplates>
  <Routes>
    <Route
        path={publicRouteCodes.HOME}
        element={<Navigate to={publicRouteCodes.PRODUCTS} replace />} />
    <Route path={publicRouteCodes.PRODUCTS} element={<Products/>} />
  </Routes>
  </PublicTemplates>
);

export default PublicRoutes;
