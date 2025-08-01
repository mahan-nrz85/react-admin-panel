import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import {Settings , Home , Person} from '@mui/icons-material';
import styled from 'styled-components'
import {AnimatePresence , motion} from 'motion/react'
const Styles = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    align-items: center;
    color: white;
    width: 100%;
    height: 100%;
    background-color: var(--bg-sec);
    .h-container {
        width: 100%;
    }
`


function Ad_Header() {
  const [profile , setProfile] = useState(null)
  const [open , setOpen] = useState(false)
  useEffect(() => {
    const url = (localStorage.getItem("profile_url")) ? JSON.parse(localStorage.getItem("profile_url")) : null;
    if(url){
      setProfile(url)
      return;
    }
  })
  const handleMenu = () => {
    setOpen(prev => !prev)
  }
  return (
    <Styles>
        <div className='h-container flex justify-between items-center'>
          <div>
            <span className='text-2xl '>پنل ادمین</span> <span>- خوش آمدید</span>
          </div>
            <div className='relative'>
              <img 
                  src={`${(profile !== null) ? profile : '/image/profile.png'}`}
                  className='w-10 h-10 rounded cursor-pointer'
                  onClick={handleMenu}
              />
              <AnimatePresence>
                {
                  open &&
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='absolute left-0 w-40 z-50 top-[3.2rem]'
                  >
                    <div className='absolute bg-white  w-full  rounded text-black !p-3'>
                        <p>ماهان نوروزی</p>
                        <p className='text-[14px] text-gray-500'>مدیر</p>
                        <div className='w-full bg-gray-400 h-[1px]'></div>
                        <ul className='!mt-2 flex flex-col gap-3'>
                          <Link to={'/setting/profile'}>
                            <li className='flex items-center gap-1'>
                              <Settings 
                                sx={{
                                  width : '20px',
                                  height : '20px'
                                }}
                              />
                              <p className='text-[14px]'>پروفایل</p>
                            </li>
                          </Link>
                          <Link to={'/dashboard'}>
                            <li className='flex items-center gap-1'>
                              <Home 
                                sx={{
                                  width : '20px',
                                  height : '20px'
                                }}
                              />
                              <p className='text-[14px]'>داشبورد</p>
                            </li>
                          </Link>
                          <Link>
                            <li className='flex items-center gap-1'>
                              <Person 
                                sx={{
                                  width : '20px',
                                  height : '20px'
                                }}
                              />
                              <p className='text-[14px]'>حساب کاربری</p>
                            </li>
                          </Link>
                        </ul>
                    </div>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
        </div>
    </Styles>
  )
}

export default Ad_Header
