import React from 'react'
import AdminLayout from '../layout/AdminLayout'
import { Outlet } from 'react-router'

function Ad_Product() {
  return (
    <AdminLayout>
      {
        (location.pathname === "/product") ?
          (
            <>
              Product
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

export default Ad_Product
