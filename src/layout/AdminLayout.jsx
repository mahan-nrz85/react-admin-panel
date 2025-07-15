import React, { useState } from 'react'
import Ad_Header from './Ad_Header'
import AdminSideBar from './AdminSideBar'
import styled from 'styled-components'
const Styles = styled.div`
    color: var(--text-clr);
    .lay-container {
        display: flex;
        width: 100vw;
    }
    .bg-layout {
        background-color: var(--bg-primary);
    }
`
function AdminLayout({children}) {
   const [isOpen, setIsOpen] = useState(true)

  return (
    <Styles>
    <div className="flex h-screen">
        <AdminSideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <div className="flex flex-col flex-1">
            
            <div className="h-16 shadow px-4 flex items-center">
                <Ad_Header />
            </div>
            <main className="bg-layout !p-4 flex-1 overflow-y-auto">
             {children}
            </main>
        </div>
    </div>
    </Styles>
  )
}

export default AdminLayout
