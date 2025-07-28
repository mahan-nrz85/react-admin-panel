import React, { useState } from 'react'
import styled from 'styled-components'
import Loading from '../components/Loading'
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import {Visibility , VisibilityOff} from '@mui/icons-material';
import { useNavigate } from 'react-router'
const Styles = styled.div`
    .input-style {
            border: 1px solid var(--input-border);
            padding:  0.5rem;
            background-color: var(--bg-input);
            border-radius: 0.5rem;
            outline: none;
            width: calc(100% );
            color: white;
            direction: ltr;
        }
        .btn-style {
            padding: 1rem;
            border-radius: 0.5rem;
            height: 40px;
            text-align: center;
            place-self: center;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--btn-bg);
            user-select: none;
            
            &:active {
                transform: scale(0.9);
            }
        }
`
function Login() {
    let Navigate = useNavigate();
    const [userData , setUserData] = useState({
        username : '',
        password : ''
    })
    const [loading , setLoading] = useState(false)
    const [showPass , setShowPass] = useState(false)
    const handleInputChange = (event) => {
        let {value , name} = event.target;
        setUserData(prev => {
            let temp = {...prev}
            temp[name] = value
            return temp
        })
    }
    const sendLoginReq = async () => {
        setLoading(true)
        let req = await fetch(`https://dummyjson.com/user/login` , {
            method : "POST",
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                
                username : userData.username,
                password : userData.password,
                expiresInMins : 30
            })
        })
        let parseData = await req.json()
        if(parseData.message) {
            enqueueSnackbar("نام کاربری یا رمز عبور اشتباه است", {variant : 'error'})
        }        
        
        if(req.ok){
            if(parseData.accessToken) {
                localStorage.setItem("user_data" , JSON.stringify(parseData))
                Navigate('/dashboard')
                enqueueSnackbar("ورود موفقیت آمیز" , {variant : "success"})
            }
            setUserData({
                password :'',
                username :''
            })

        }
        setLoading(false)
        
    }
  return (
    <Styles>
        <SnackbarProvider>
            <div className='grid grid-cols-2 place-content-center bg-[var(--bg-sec)] h-full'>
            <div className='forms h-full flex items-center justify-center '>
                <div className='form-container w-80 !p-4 rounded-2xl'>
                    <h2 className='text-white text-2xl'>ورود به پنل</h2>
                    <p className='text-[12px] text-gray-500'>نام کاربری و رمز عبور خود را وارد کنید</p>
                    <div className='flex flex-col !mt-5'>
                        <label  className='text-[14px] !mb-1 text-white' htmlFor="">نام کاربری (emilys)</label>
                        <input 
                            type="text" 
                            className='input-style'
                            onChange={handleInputChange}
                            value={userData.username}
                            name='username'
                        />
                    </div>
                    <div className='flex flex-col !mt-5 relative'>
                        <label  className='text-[14px] !mb-1 text-white' htmlFor="">رمز عبور(emilyspass)</label>
                        <input 
                            type={`${(showPass) ? "text" : "password"}`}
                            className='input-style'
                            onChange={handleInputChange}
                            value={userData.password}
                            name='password'

                        />
                        {
                            (showPass) ? <VisibilityOff onClick={() => setShowPass(false)} className='absolute top-8 right-2 cursor-pointer' /> : <Visibility onClick={() => setShowPass(true)} className='absolute top-8 right-2 cursor-pointer' />
                        }
                        
                    </div>
                    {
                        (loading) ? 
                            <Loading classname={'!h-0 !mt-8'}/>
                            :
                            <button 
                                className='btn-style w-full bg-[var(--btn-bg)] !p-2 rounded-2xl !mt-5 text-white cursor-pointer'
                                onClick={() => sendLoginReq()}    
                            >
                                
                                ورود
                            </button>

                    }
                </div>
            </div>
            <div className='img h-[100vh] overflow-hidden relative'>
                <img src={'/image/login_bg.png'}/>
                <div className='absolute top-1/2 right-58 w-full'>
                    <h2 className='text-4xl'>ادمین پنل نوروزی</h2>
                </div>
            </div>
            </div>
        </SnackbarProvider>
    </Styles>
  )
}

export default Login
