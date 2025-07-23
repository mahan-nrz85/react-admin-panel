import React, { lazy, useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { AnimatePresence, motion } from "motion/react"
import Button from '@mui/material/Button';
import DialogBox from '../components/Dialog';
const AdminLayout = lazy(() => import('../layout/AdminLayout'))
const Loading = lazy(() => import('../components/Loading'))
const Styles = styled.div`
  thead {
    background-color: var(--bg-sec);
    padding: 1rem !important;
  }
  table tbody tr {
    &:hover {
      background-color: rgba(19, 81, 214, 0.3);
    }
    &:nth-child(odd){
      background-color: #293d5e;
    }
    &:nth-child(even) {
      background-color: #273349;
    }
  }
  table tbody tr:hover {
    background-color: rgba(58, 74, 109, 0.3);
  }
  .action-btn {
    font-size: 14px;
    cursor: pointer;
    &:nth-child(2){
      background-color: var(--err-clr)  ;
      padding: 0.25rem 0.5rem;
      border-radius: 10px;
    }
    &:nth-child(1){
      background-color: var(--success-clr)  ;
      padding: 0.25rem 0.5rem;
      border-radius: 10px;
    }
  }
  .MuiButtonBase-root {
    color: white;
  }
  .Mui-selected {
    background-color: var(--icon-clr) !important;
  }
  .inp-search{
    border: 1px solid var(--input-border);
    background-color: var(--input-bg);
    padding: 0.5rem;
    outline: none;
    margin-bottom: 1rem;
    border-radius: 8px;
    font-size: 14px;
    color: white;
  }
  select {
    cursor: pointer;
  }
  
  option {
    cursor: pointer;
    background-color: var(--bg-sec);
  }

  .add-btn {
    border: 1px solid var(--input-border);
    background-color: var(--btn-bg);
    font-family: vazir;
  }
`
function Ad_Users() {
  const [users , setUser] = useState([]);
  const [loading , setLoading] = useState(false);
  const [currentPage , setCurrentPage] = useState(1);
  const [ItemPerPage , setItemPerPage] = useState(7)
  const [searchValue , setSearchValue] = useState('')
  const [roleFilter , setRoleFilter] = useState('')
  const [openDialog , setOpenDialog] = useState(false)
  const [editStatus , setEditStatus] = useState(false)
  const [id , setId] = useState(null)
  const [errors, setErrors] = useState({});
  const [userInfo , setUserInfo] = useState({
    firstName : '',
    lastName : '',
    email : '',
    role : '',
  })
  useEffect(() => {
    fetchUsers()
  } , [])
  
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const req = await fetch(`https://json-server-api-lbft.onrender.com/users`);
      if(req.status === 200) {
        const parsed = await req.json()
        setUser(parsed)
      }
    } catch (error) {
      enqueueSnackbar("خطا در لود کاربران از سرور" , {variant : 'error'})
    }
    setLoading(false)
  }
  const deleteUser = async (id) => {    
    try {
      const req = await fetch(`https://json-server-api-lbft.onrender.com/users/${id}` , {
        method : 'DELETE'
      });
      
      if(req.ok){
        let userIndex = filterUser.findIndex(user => user.id === id)
        if(userIndex !== -1) {
          let temp = [...filterUser]
          temp.splice(userIndex , 1);
          setUser(temp)
        }
        enqueueSnackbar("کاربر با موفیت حذف شد" , {variant : "success"})
      } else {
        enqueueSnackbar("خطا در حذف کاربر" , {variant : "error"})
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}` , {variant : "error"})
    }
  }
  const addUser = async (e) => {
  if (validateInputs()) {
    try {
      const req = await fetch('https://json-server-api-lbft.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          role: userInfo.role,
        })
      });
      if(req.ok){
        let newUser = {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          role: userInfo.role,
        }
        setUser(prev => [...prev , newUser])
        enqueueSnackbar("کاربر با موفقیت اضافه شد" , {variant : "success"})
        setOpenDialog(false)
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  } else {
    Object.entries(errors).map(val => {
      return enqueueSnackbar(val[1] , {variant:"error"})
    })
  }
  }
  const editUser = async (id) => {    
    
    if (validateInputs()) {
    try {
      // const req = await fetch(`http://localhost:4000/users/${userInfo.id}`, {
      const req = await fetch(`https://json-server-api-lbft.onrender.com/users/${userInfo.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          role: userInfo.role,
        })
      });
      if(req.ok){
        setUser(prev => {
          let temp = [...prev]
          let userIndex = filterUser.findIndex(user => user.id === id)
          if(userIndex !== -1){
            temp[userIndex] = {...temp[userIndex] , 
                              firstName : userInfo.firstName , 
                              lastName : userInfo.lastName , 
                              email : userInfo.email,
                              role : userInfo.role
                            }
                          }
          return temp
        })
        enqueueSnackbar("کاربر با موفقیت ویرایش شد" , {variant : "success"})
        setOpenDialog(false)
        setId(null)
        setUserInfo({
          firstName : '',
          lastName : '',
          email : "",
          role : ''
        })
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  } else {
    Object.entries(errors).map(val => {
      return enqueueSnackbar(val[1] , {variant:"error"})
    })
  }
  }
  // user search handle
  const searchUser = () => {
    let filterUser = [...users];
    if(searchValue.length > 0) {
      // حتما مقدار دهی مجدد باید بشه تا مقادیر تغییر بکنن
      filterUser = filterUser.filter(user => {
        return user.firstName.toLowerCase().includes(searchValue.toLowerCase()) || user.lastName.toLowerCase().includes(searchValue.toLowerCase())
      })
    }
    return filterUser
  }
  const handleClose = () => {
    setOpenDialog(false);
    setUserInfo({
          firstName : '',
          lastName : '',
          email : "",
          role : ''
        })
    setEditStatus(false)
    setId(null)
  };
  // input change handler
  const changeInputHandler = (event) => {
    let {name , value} = event.target
    setUserInfo(prev => ({
      ...prev,
      [name] : value
    }))
    validateInputs();
  }
  // validation func
  const validateInputs = () => {
    let errors = {}
    if(!userInfo.firstName){
      errors.firstName = 'فیلد نام اجباری است'
    }
    if(!userInfo.lastName){
      errors.lastName = 'فیلد نام خانوادگی اجباری است'
    }
    if(!userInfo.email){
      errors.email = 'فیلد ایمیل اجباری است'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      errors.email = 'فرمت ایمیل نامعتبر است';
    }
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  let filterUser = searchUser();
  let countPage = Math.ceil(filterUser.length / ItemPerPage);
  let sItem = (currentPage - 1 ) * ItemPerPage;
  let eItem = sItem + ItemPerPage;
  let sliceUsers = filterUser.slice(sItem , eItem)
  return (
    <Styles>
      <AdminLayout>
        <SnackbarProvider maxSnack={3}>
          <AnimatePresence>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {
                (loading) ? 
                  (
                    <Loading />
                  )
                  : 
                  (
                    // user Filter
                    <>
                      <div className='search-user  flex justify-between  '>
                        <div className='flex items-center gap-5'>
                          <p className='!mb-[0.5rem]'>فیلتر کاربران</p>
                          <input 
                            type='text'
                            placeholder='جستجو کاربر'
                            className='inp-search'
                            onChange={(event) => {
                              setSearchValue(event.target.value)
                            }}
                          />
                          <select 
                            type='text'
                            placeholder='جستجو کاربر'
                            className='inp-search'
                            onChange={(event) => {
                                enqueueSnackbar("تو آپدیت بعدی اضافه میشه 😉" , {variant : "info"})
                              setRoleFilter(event.target.value)
                            }}
                          >
                            <option value={'مدیر'}>مدیر</option>
                            <option value={'کاربر'}>کاربر</option>
                            <option value={'پشتیبانی'}>پشتیبانی</option>
                          </select>
                        </div>
                        {/* Add user btn */}
                        <div>
                          <Button 
                            variant="outlined"
                            className='add-btn'
                            onClick={() => setOpenDialog(true)}
                          >اضافه کردن کاربر</Button>
                        </div>
                      </div>
                      <table className='w-full text-center'>
                        <thead>
                          <tr>
                            <th className=''>نام</th>
                            <th className=''>نام خانوادگی</th>
                            <th className=''>ایمیل</th>
                            <th className=''>نقش</th>
                            <th className=''>عملیات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            sliceUsers?.map((user , i) => {
                              const {firstName , lastName , email , role} = user
                              return (
                                <tr key={user.id}>
                                  <td className='!p-2'>{firstName}</td>
                                  <td className='!p-2'>{lastName}</td>
                                  <td className='!p-2'>{email}</td>
                                  <td className='!p-2'>{role}</td>
                                  <td className='!p-2 flex gap-3 items-center justify-center'>
                                    {/* edit btn */}
                                    <button 
                                      className='action-btn'
                                      onClick={() => {
                                        setId(user.id)
                                        setUserInfo({
                                          id : user.id,
                                         firstName : firstName,
                                         lastName : lastName,
                                         email : email,
                                         role : role
                                        })
                                        setOpenDialog(true)
                                        setEditStatus(true)
                                        // enqueueSnackbar("تو آپدیت بعدی اضافه میشه 😉" , {variant : "info"})
                                      }}
                                    >ویرایش</button>
                                    {/* delete btn */}
                                    <div 
                                      className='action-btn'
                                      onClick={() => {
                                        deleteUser(user.id)
                                      }}
                                    >
                                      حذف
                                    </div>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                        <Pagination 
                          style={{
                            display : 'flex',
                            alignItems : 'center',
                            justifyContent : 'center',
                            marginTop : '1rem'
                          }}
                          sx={
                            {
                              color : 'white !important',
                            }
                          }
                          count={countPage} 
                          page={currentPage}
                          color="standard" 
                          // Mui onchange get 2 Argumane and value of page is in second argumane////////
                          onChange={(event , value) => {
                            setCurrentPage(value)
                          }}
                        />
                    
                    </>
                      
                  )
              }
            </motion.div>
          </AnimatePresence>
          <DialogBox
            open={openDialog}
            close={handleClose}
            btnText={'افزودن'}
            titleModal={'افزودن کاربر'}
            btnHandler={addUser}
          >
            <div className='flex flex-col gap-3 items-center justify-center'>
              <input 
                type='text'
                placeholder='نام'
                name='firstName'
                value={userInfo.firstName}
                onChange={(event) => {
                  changeInputHandler(event)
                }}
                className='border border-[var(--input-border)] bg-[var(--input-bg)] w-[70%] outline-0 !p-3 rounded-2xl placeholder:text-gray-400 placeholder:text-[14px] text-white'
              />
              <input 
                type='text'
                placeholder='نام خانوادگی'
                name='lastName'
                value={userInfo.lastName}
                onChange={(event) => {
                  changeInputHandler(event)
                }}
                className='border border-[var(--input-border)] bg-[var(--input-bg)] w-[70%] outline-0 !p-3 rounded-2xl placeholder:text-gray-400 placeholder:text-[14px] text-white'
              />
              <input 
                type='text'
                placeholder='ایمیل'
                name='email'
                value={userInfo.email}
                onChange={(event) => {
                  changeInputHandler(event)
                }}
                className='border border-[var(--input-border)] bg-[var(--input-bg)] w-[70%] outline-0 !p-3 rounded-2xl placeholder:text-gray-400 placeholder:text-[14px] text-white'
                />
              <select 
                className='border border-[var(--input-border)] bg-[var(--input-bg)] w-[70%] outline-0 !p-3 rounded-2xl placeholder:text-gray-400 placeholder:text-[14px] text-white'
                name='role'
                value={userInfo.role}
                onChange={(event) => {
                  changeInputHandler(event)
                }}
              >
                <option className='bg-[var(--bg-primary)]' value={''}>نقش کاربر</option>
                <option className='bg-[var(--bg-primary)]' value={'مدیر'}>مدیر</option>
                <option className='bg-[var(--bg-primary)]' value={'کاربر'}>کاربر</option>
                <option className='bg-[var(--bg-primary)]' value={'پشتیبانی'}>پشتیبانی</option>
              </select>
                <div
                  onClick={() => (editStatus) ? editUser() : addUser()}
                  className='bg-[var(--btn-bg)] border border-[#334155] !p-3 rounded-2xl text-white cursor-pointer'
                >
                  {editStatus ? 'ویرایش' : 'افزودن'}
                </div>
            </div>
          </DialogBox>
        </SnackbarProvider>
      </AdminLayout>
    </Styles>
  )
}

export default Ad_Users
