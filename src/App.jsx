import { Suspense, useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import { routes } from './config/Routes'
import Loading from './components/Loading';

function AppRoutes() {
  const location = useLocation();
  const renderRoutes = (routes) => {
    return routes.map((rout , i) => {
      if(rout.children && rout.children.length > 0) {
        return (
          <Route 
            path={rout.path}
            element={rout.element}
            key={i}
          >
            {renderRoutes(rout.children)}
          </Route>
        )
      } else {
        return (
          <Route 
            path={rout.path}
            element={rout.element}
            key={i}
          />
        )
      }
    })
  }
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {renderRoutes(routes)}
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
