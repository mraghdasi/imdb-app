import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import TcLoading from 'components/UI/Loading/TcLoading';
import TcLayout from 'components/Layout/TcLayout';

function MainRouter() {
  const Main = React.lazy(() => import('./pages/Main/Main'));

  const routesList = [
    {
      path: '/',
      component: Main,
    },
  ];
  return (
    <>
      <TcLayout>
        <Suspense fallback={<TcLoading className='grid h-screen place-items-center' />}>
          <Routes>
            {routesList.map((route) => (
              <Route key={route.path} {...route} />
            ))}
            {/* <Route path='*' element={<Navigate to='/' />} /> */}
          </Routes>
        </Suspense>
      </TcLayout>
    </>
  );
}

export default MainRouter;
