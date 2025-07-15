import React, { useState } from 'react'
import styled from 'styled-components'
import { routes } from '../config/Routes'
import { Link } from 'react-router'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Styles = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--bg-sec);
    color: var(--text-clr);
    .side-container {
        margin-top: 3rem;
        height: 100%;
        & ul > a {
            padding: 0.5rem;   
            border-radius: 1rem;
            transition: all 150ms ease-in-out;
            &:hover {
                border-radius: 0.5rem;
                background-color: var(--hover-text-clr);
            }
        }
        &.opened {
            transition: width 0.3s ease-in-out;
        }
        &.closed {
            transition: width 0.3s ease-in-out;
        }
    }
    .close-icon{
        margin-top: 1.5rem;
    }
`
function AdminSideBar({
    isOpen,
    setIsOpen
}) 
{
    
    const renderMenu = routes.map((item , i) => {
        return <Link key={i} className={`flex  gap-2 w-[90%] items-center ${isOpen ? '' : 'justify-center'}`} to={item.path}>
                <span>{item.icon}</span>
                { isOpen && <li className='flex text-left gap-0.5'>{item.label}</li>}
        </Link>
    })
    return (
        <Styles>
            <div 
                className='close-icon flex items-center justify-center cursor-pointer'
                onClick={() => setIsOpen(prev => {
                    return !prev
                })}
            >
                {isOpen ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
                
            </div>
            <div className={`side-container ${isOpen ? 'w-40 opened' : 'w-16 closed'} p-5`}>
                <ul className='flex flex-col items-center gap-5 p-4'>
                    {renderMenu}
                </ul>
            </div>
        </Styles>
    )
}

export default AdminSideBar
