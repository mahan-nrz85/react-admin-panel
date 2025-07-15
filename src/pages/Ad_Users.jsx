import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import AdminLayout from '../layout/AdminLayout'
import Loading from '../components/Loading';
import styled from 'styled-components';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { AnimatePresence, motion } from "motion/react"
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
  option {
    background-color: #252537;
  }

`
function Ad_Users() {
  const [users , setUser] = useState([]);
  const [loading , setLoading] = useState(false);
  const [currentPage , setCurrentPage] = useState(1);
  const [ItemPerPage , setItemPerPage] = useState(7)
  const [searchValue , setSearchValue] = useState('')
  const [roleFilter , setRoleFilter] = useState('')
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
    event.preventDefault()
    try {
      const req = await fetch(`http://localhost:4000/users/${id}` , {
        method : 'DELETE'
      });
      
      if(req.ok){
        let userIndex = filterUser.findIndex(user => user.id === id)
        console.log("index =>" , userIndex);
        
        if(userIndex != -1) {
          filterUser.splice(userIndex , 1);
        }
      } else {
        enqueueSnackbar("خطا در حذف کاربر" , {variant : "error"})
      }
    } catch (error) {
      enqueueSnackbar(`${error.message}` , {variant : "error"})
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
                    <>
                      <div className='search-user  flex items-center gap-2 '>
                        <p className='!mb-[0.5rem] w-[10%]'>فیلتر کاربران</p>
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
                          className='inp-search w-[15%]'
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
                                    <button 
                                      className='action-btn'
                                      onClick={(event) => {
                                        deleteUser(user.id)
                                        
                                      }}
                                    >
                                      حذف
                                    </button>
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
                              // backgroundColor : 'red'
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
        </SnackbarProvider>
      </AdminLayout>
    </Styles>
  )
}

export default Ad_Users
