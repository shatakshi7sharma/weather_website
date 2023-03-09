import React from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';

import { PRIVATE_ROUTES } from './PrivateRoutes';
import RenderRoutes from './RenderRoutes';


const AuthenticatedRoutes = () => {
  return <RenderRoutes routes={PRIVATE_ROUTES} />;
};

const RootRouter = () => {
  return (
    <BrowserRouter>
      <AuthenticatedRoutes/>
    </BrowserRouter>
  );
};

export default RootRouter;
