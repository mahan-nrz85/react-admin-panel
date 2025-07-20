import React from 'react'
import AdminLayout from '../layout/AdminLayout'
import { Outlet, useLocation } from 'react-router'

function Ad_Setting() {
  const location = useLocation();
  return (
    <AdminLayout>
      {
        (location.pathname === '/setting') ?
            (
              <>
                Setting
              </>
            )
            :
              (
                <Outlet />
              )
      }
    </AdminLayout>
  )
}

export default Ad_Setting
