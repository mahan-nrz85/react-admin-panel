import { Suspense, useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import { routes } from './config/Routes'
import Loading from './components/Loading';

function AppRoutes() {
  const location = useLocation();
  console.log(location);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routes.map((val, i) => (
          <Route key={i} path={val.path} element={val.element} />
        ))}
        <Route path='*' element={<Navigate to={'/dashboard'} replace/>}/>
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App
