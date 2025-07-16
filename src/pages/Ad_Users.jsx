import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import AdminLayout from '../layout/AdminLayout'
import Loading from '../components/Loading';
import styled from 'styled-components';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { AnimatePresence, motion } from "motion/react"
import Button from '@mui/material/Button';
import DialogBox from '../components/Dialog';
const Styles = styled.div`
  thead {
    background-color: #6363b4;
    padding: 1rem !important;
  }
  table tbody tr {
    &:hover {
      background-color: rgba(19, 81, 214, 0.3);
    }
    &:nth-child(odd){
      background-color: #252537;
    }
    &:nth-child(even) {
      background-color: #33334A;
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
    border: 1px solid #6363b4;
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
    background-color: #252537;
  }

  .add-btn {
    border: 1px solid #6363b4;
    font-family: vazir;
  }
  .inp-add {
    border: 1px solid #6363b4 !important;

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
      const req = await fetch(`http://localhost:4000/users`);
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
      const req = await fetch(`http://localhost:4000/users/${id}` , {
        method : 'DELETE'
      });
      
      if(req.ok){
        let userIndex = filterUser.findIndex(user => user.id === id)
        if(userIndex !== -1) {
          let temp = [...filterUser]
          temp.splice(userIndex , 1);
          setUser(temp)
        }
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
      const req = await fetch('http://localhost:4000/users', {
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
                              return (
                                <tr key={user.id}>
                                  <td className='!p-2'>{user.firstName}</td>
                                  <td className='!p-2'>{user.lastName}</td>
                                  <td className='!p-2'>{user.email}</td>
                                  <td className='!p-2'>{user.role}</td>
                                  <td className='!p-2 flex gap-3 items-center justify-center'>
                                    <button 
                                      className='action-btn'
                                      onClick={() => {
                                        enqueueSnackbar("تو آپدیت بعدی اضافه میشه 😉" , {variant : "info"})
                                      }}
                                    >ویرایش</button>
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
                onChange={(event) => {
                  changeInputHandler(event)
                }}
                className='border border-[#6363b4] w-[70%] outline-0 !p-3 rounded-2xl placeholder:text-gray-400 placeholder:text-[14px] text-white'
              />
              <input 
                type='text'
                placeholder='نام خانوادگی'
                name='lastName'
                onChange={(event) => {
                  changeInputHandler(event)
                }}
                className='border border-[#6363b4] w-[70%] outline-0 !p-3 rounded-2xl placeholder:text-gray-400 placeholder:text-[14px] text-white'
              />
              <input 
                type='text'
                placeholder='ایمیل'
                name='email'
                onChange={(event) => {
                  changeInputHandler(event)
                }}
                className='border border-[#6363b4] w-[70%] outline-0 !p-3 rounded-2xl placeholder:text-gray-400 placeholder:text-[14px] text-white'
                />
              <select 
                className='border border-[#6363b4] w-[70%] outline-0 !p-3 rounded-2xl placeholder:text-gray-400 placeholder:text-[14px] text-white'
                name='role'
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
                  onClick={(event) => addUser(event)}
                  className='bg-[var(--success-clr)] !p-3 rounded-2xl text-white cursor-pointer'
                >
                  افزودن
                </div>
            </div>
          </DialogBox>
        </SnackbarProvider>
      </AdminLayout>
    </Styles>
  )
}

export default Ad_Users
