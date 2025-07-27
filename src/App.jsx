import { Suspense, useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router'
import { routes } from './config/Routes'
import Loading from './components/Loading';
import Login from './pages/Login';
import Logout from './pages/Logout';

function AppRoutes() {
  let navigate = useNavigate()
  useEffect(() => {
    const isLogin = JSON.parse(localStorage.getItem("user_data"))    
    if(isLogin) {
      return;
    } else {
      navigate('/login')
    }
  } , [])
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
        <Route 
          path='/login'
          element={<Login />}

        />
        <Route 
          path='/logout'
          element={<Logout />}

        />
        {renderRoutes(routes)}
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
