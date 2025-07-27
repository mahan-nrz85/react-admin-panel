import React, { useState } from 'react'
import styled from 'styled-components'
import { routes } from '../config/Routes'
import { Link } from 'react-router'
import {ArrowBackIos , ArrowForwardIos , ExpandMore , Logout} from '@mui/icons-material';
import { motion, AnimatePresence } from 'motion/react';
const Styles = styled.div`
    display: flex;
flex-direction: column;
background-color: var(--bg-sec);
color: var(--text-clr);

.side-container {
    margin-top: 3rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .menu-item {
        padding: 0.5rem;
        border-radius: 1rem;
        transition: all 150ms ease-in-out;
        height: auto;
        overflow: hidden;
        user-select: none;

        &.open-sub {
            overflow: visible;
        }

        &:hover {
            border-radius: 0.5rem;
            background-color: var(--hover-text-clr);
        }

        .submenu {
            margin-right: 0.5rem;
            margin-top: 0.75rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            overflow: hidden;
            max-height: 0;
            opacity: 0;
            transition: max-height 0.3s ease, opacity 0.3s ease;
            & > a:hover {
                color: black;
            }
        }

        &.open-sub .submenu {
            max-height: 500px;
            opacity: 1;
        }
    }

    &.opened,
    &.closed {
        transition: width 0.3s ease-in-out;
    }
}

.close-icon {
    margin-top: 1.5rem;
}
.btn {
    display: flex;
    background-color: var(--err-clr);
    align-items: center;
    border-radius: 10px;
    justify-content: center;
    width: 80%;
    height: 40px;
    margin: 0 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    p button{
        color: white;
        padding: 0.5rem;
        display: block;
        text-align: center;
    }
    &:active{
        transform: scale(0.9);
    }
    }

`
function AdminSideBar({
    isOpen,
    setIsOpen
}) {
   const [openSubmenu , setOpenSubmenu] = useState({})
   const toggleSubmenu = (index) => {
         setOpenSubmenu(prev => ({
        ...prev,
        [index]: !prev[index]
        }));
    };
    const submenuVariants = {
            hidden: {
            scaleY: 0,
            opacity: 0,
            transformOrigin: "top",
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        visible: {
            scaleY: 1,
            opacity: 1,
            transformOrigin: "top",
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        exit: {
            scaleY: 0,
            opacity: 0,
            transformOrigin: "top",
            transition: { duration: 0.3, ease: "easeInOut" }
        }
    };
    const renderMenu = routes.map((item , i) => {
        return (
            <div className={`menu-item w-[90%] ${openSubmenu[i] ? 'open-sub' : ''}`} key={i}>
            {item.children && item.children.length > 0 ? (
                <div
                onClick={() => toggleSubmenu(i)}
                className={`flex gap-2 items-center justify-between cursor-pointer ${isOpen ? '' : 'justify-center'}`}
                >
                <div className='flex'>
                    <span>{item.icon}</span>
                    {isOpen && <li className='flex text-left gap-0.5'>{item.label}</li>}
                </div>
                {isOpen &&
                    <ExpandMore className={`${openSubmenu[i] ? 'rotate-180 transition-transform duration-300' : 'transition-transform duration-300'}`} />
                }
                </div>
            ) : (
                <Link
                className={`flex gap-2 items-center ${isOpen ? '' : 'justify-center'}`}
                to={item.path}
                >
                <span>{item.icon}</span>
                {isOpen && <li className='flex text-left gap-0.5'>{item.label}</li>}
                </Link>
            )}

            {item.children && item.children.length > 0 && (
                <AnimatePresence initial={false}>
                {openSubmenu[i] && (
                    <motion.div
                    className='submenu pl-4'  
                    variants={submenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit=""
                    >
                    {item.children.map((val, j) => (
                        <Link to={val.path} key={j} className='block py-1'>
                        {val.title}
                        </Link>
                    ))}
                    </motion.div>
                )}
                </AnimatePresence>
            )}
            </div>
            )
    })
    return (
        <Styles>
            <div 
                className='close-icon flex items-center justify-center cursor-pointer'
                onClick={() => {
                    setIsOpen(prev => {
                        return !prev
                    })
                    setOpenSubmenu({})
                }}
            >
                {isOpen ? <ArrowForwardIos /> : <ArrowBackIos />}
                
            </div>
            <div className={`side-container ${isOpen ? 'w-40 opened' : 'w-16 closed'} p-5`}>
                <ul className='flex flex-col items-center gap-5 p-4'>
                    {renderMenu}
                </ul>
                <Link to={'/logout'}>
                    <div className={`btn ${isOpen ? '' : '!justify-between !bg-[transparent]'}`}>
                        <Logout 
                            sx={
                                {
                                    fill : 'black'
                                }
                            }
                        />
                        <p>
                            {
                                isOpen && 
                                <button type='button'>خروج</button>

                            }
                        </p>
                    </div>
                </Link>
            </div>
        </Styles>
    )
}

export default AdminSideBar
