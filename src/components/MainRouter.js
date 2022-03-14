import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from 'components/UI/Loading/Loading';
import Layout from 'components/Layout/Layout';

function MainRouter() {
  const FilmList = React.lazy(() => import('./pages/Films/List/FilmList'));
  const WatchList = React.lazy(() => import('./pages/WatchList/List/WatchList'));

  const routesList = [
    {
      path: '/',
      component: FilmList,
    },
    {
      path: '/watchList',
      component: WatchList,
    },
  ];
  return (
    <>
      <Layout>
        <Suspense fallback={<Loading className='grid h-screen place-items-center' />}>
          <Routes>
            {routesList.map((route) => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}

            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default MainRouter;
