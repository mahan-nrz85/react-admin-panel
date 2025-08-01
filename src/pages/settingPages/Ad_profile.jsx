import React, { useEffect, useState } from 'react'
import CloudinaryUploader from '../../components/module/CloudinaryUploader';
import Dialog from '../../components/Dialog';
import Loading from '../../components/Loading'
import { enqueueSnackbar , SnackbarProvider } from 'notistack';
// Tailwind Style

function Ad_profile() {
  const [previewFile , setPreviewFile] = useState(null)
  const [file , setFile] = useState(null)
  const [image , setImage] = useState('')
  const [profile , setProfile] = useState('')
  const [loading , setLoading] = useState(false);
  const [open , setOpen] = useState(false)
  const [dialogNum , setDialogNum] = useState(1)
  useEffect(() => {
    const img = JSON.parse(localStorage.getItem("img_url") || '""');
    const profile = JSON.parse(localStorage.getItem("profile_url") || '""');
    if(img === undefined && profile === undefined){
      localStorage.removeItem("img_url");
      localStorage.removeItem("profile_url");
      return;
    } else {
      setImage(img);
      setProfile(profile);
    }
  }, []);

  const recentactivities = [
    {
      title : 'آپدیت کاربر های سایت',

    },
    {
      title : 'بن کردن بعضی از کاربران'
    },
    {
      title : "به روزرسانی گزارش های سایت"
    }
  ]
  const handleModal = () => {
    setOpen(prev => !prev)
    setPreviewFile(null)
    setFile(null)    
  }
  // show prew image in front
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if(!file){
      enqueueSnackbar("فایلی انتخاب نشده است" , {variant: "error"})
      return
    }
    setPreviewFile(URL.createObjectURL(file));
    setFile(file)
  }
  // send img to server for upload and save in local storage for show and update ui
  const uploadImage = async () => {
    if(!file){
      enqueueSnackbar("فایلی انتخاب نشده است" , {variant: "error"})
      return;
    } 
    try {
      setLoading(true)
      const sendReq = await CloudinaryUploader(file)
      setLoading(false)
      if(sendReq.error){
        let newErr = sendReq.error.message.slice(0,19)
        if(newErr === "File size too large"){
          enqueueSnackbar("فایل باید کمتر از 10MB باشد" , {variant:"error"})
        }        
      }
      localStorage.setItem("img_url" , JSON.stringify(sendReq.secure_url))  
      setImage(sendReq.secure_url)    
      handleModal()
      setFile(null)
      
    } catch (error) {
      if(error){
        enqueueSnackbar("مشکلی در اینترنت یا سرور پیش آمده است" , {variant:"error"});
        setLoading(false)
        setPreviewFile(null)
        setImage(null)
        handleModal()
      }
    }
    
  }
  // send profile to server for upload and save in local storage for show and update ui
  const uploadProfileImage = async () => {
    if(!file){
      enqueueSnackbar("فایلی انتخاب نشده است" , {variant: "error"})
      return;
    } 
    try {
      setLoading(true)
      const sendReq = await CloudinaryUploader(file)
      setLoading(false)
      if(sendReq.error){
        let newErr = sendReq.error.message.slice(0,19)
        if(newErr === "File size too large"){
          enqueueSnackbar("فایل باید کمتر از 10MB باشد" , {variant:"error"})
        }        
      }
      localStorage.setItem("profile_url" , JSON.stringify(sendReq.secure_url))  
      setProfile(sendReq.secure_url)    
      handleModal()
      setFile(null)
      
    } catch (error) {
      if(error){
        enqueueSnackbar("مشکلی در اینترنت یا سرور پیش آمده است" , {variant:"error"});
        setLoading(false)
        setPreviewFile(null)
        setProfile(null)
        handleModal()
      }
    }
      
    
  }
  const renderActivities = recentactivities.map((item , i ) =>{
    return (
      <div 
        key={i}
        className='!p-2 text-[14px] hover:bg-blue-700 hover:rounded'
      >
        <h3>{item.title}</h3>
      </div>
    )
  })
  return (
    <>
    <SnackbarProvider>
      <div className='main-container flex flex-col items-center justify-center w-full'>
          <div className='main-div bg-[#1A1D1F] w-[80%] rounded-2xl relative h-[300px]'>
              <div
                className=' bg-blue-400 rounded-2xl !p-3 mx-auto w-[100%] h-[180px] shadow '
                style={{
                  backgroundImage : `url(${image})`,
                  backgroundPosition : 'center',
                  backgroundRepeat : "no-repeat",
                  backgroundSize : 'cover'
                }} 
                >
                <button
                  type='button' 
                  className='  bg-white/40 !p-2 cursor-pointer absolute left-[1rem] top-[8rem] rounded-2xl z-30'
                  onClick={() => {
                    setDialogNum(1)
                    handleModal()
                  }}
                >
                  {
                    (image === '') ? 'افزودن پس زمینه' : 'ویرایش'
                  }
                </button>
              </div>
              <div className='flex gap-5 items-end justify-between absolute bottom-10 !p-3 w-full'>
                <div className='flex items-end gap-5'>
                  <img src={`${(profile) ? profile : '/image/profile.png' }`} alt='پروفایل' className='w-25 h-25 rounded-[9999px]'/>
                    <div className='content'>
                      <h2 className='text-2xl'>ماهان نوروزی</h2>
                      <p>نقش : مدیر</p>
                    </div>
                </div>
                  <button 
                    type='button'
                    className='bg-[var(--btn-bg)] !p-3 rounded-2xl cursor-pointer'
                    onClick={() => {
                      setDialogNum(2)
                      handleModal()
                    }}
                  >
                    {(profile) ? 'ویرایش عکس' : 'افزودن عکس'}
                  </button>
              </div>
          </div>
          {/* content */}
          <div className='content !mt-5 flex  gap-5 w-[80%]'>
            <div className='bg-blue-400/30 w-[70%] !p-3 rounded'>
              d
            </div>
            <div className="relative before:content-[''] before:absolute before:w-3 before:h-6 before:rounded before:right-1 before:bg-blue-500 bg-blue-400/30 w-[30%] !p-5  rounded">
              <p className='border-b-1 !p-1 border-gray-500'>
              فعالیت های اخیر
              </p>
            <div className="!mt-2">
                {
                  renderActivities
                }
            </div>
            </div>
          </div>
      </div>

      <Dialog
        titleModal={(dialogNum === 1) ? 'آپلود پس زمینه' : 'آپلود پروفایل'}
        open={open}
        close={handleModal}
      >
        {
          (dialogNum === 1) ?
            (
              <div className='flex flex-col items-center'>
                <div className='w-full h-[250px] relative flex items-center justify-center' style={{
                  border : '4px dotted gray'
                }}>
                  {
                    (previewFile === null) ?  
                      (
                        <>
                          <input 
                            type='file'
                            className='w-full h-full opacity-0 cursor-pointer z-10'
                            onChange={handleFileChange}
                            value={previewFile}
                          />
                          <h3 className='absolute  text-white/30 select-none'>
                            عکس مورد نظرتان را آپلود کنید
                          </h3>
                        </>
                        
                      )
                      :
                        (
                          <img src={previewFile} className='w-fit h-[250px]'/>
                        )
                  }

                </div>
                <div className=''>
                  {
                    (loading) ?
                      <Loading classname={'!h-[70px]'}/>
                      :
                      (
                      <button 
                        type='button'
                        onClick={uploadImage}
                        className='bg-[var(--btn-bg)]  !p-3 w-[70px] rounded-2xl !mt-4 cursor-pointer text-white transition-transform duration-150 focus:scale-[0.9] active:scale-[0.9]'
                        style={{
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        width: '100px',
                        height: '40px',
                        cursor: 'pointer',
                        backgroundColor: 'var(--btn-bg)',
                        }}
                        >

                            <p>آپلود</p>
                        
                        
                      </button>

                      )
                  }

                </div>
              </div>
            )
            : (
                <div className='flex flex-col items-center'>
                <div className='w-32 h-30 rounded-[9999px] relative flex items-center justify-center' style={{
                  border : '4px dotted gray'
                }}>
                  {
                    (previewFile === null) ?  
                      (
                        <>
                          <input 
                            type='file'
                            className='w-full h-full opacity-0 cursor-pointer z-10'
                            onChange={handleFileChange}
                            value={previewFile}
                          />
                          <h3 className='absolute  text-white/30 select-none text-[12px] text-center'>
                            پروفایل مورد نظرتان را آپلود کنید
                          </h3>
                        </>
                        
                      )
                      :
                        (
                          <img src={previewFile} className='w-30 h-30 rounded-[9999px]'/>
                        )
                  }

                </div>
                <div className=''>
                  {
                    (loading) ?
                      <Loading classname={'!h-[70px]'}/>
                      :
                      (
                      <button 
                        type='button'
                        onClick={uploadProfileImage}
                        className='bg-[var(--btn-bg)]  !p-3 w-[70px] rounded-2xl !mt-4 cursor-pointer text-white transition-transform duration-150 focus:scale-[0.9] active:scale-[0.9]'
                        style={{
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        width: '100px',
                        height: '40px',
                        cursor: 'pointer',
                        backgroundColor: 'var(--btn-bg)',
                        }}
                        >

                            <p>آپلود</p>
                        
                        
                      </button>

                      )
                  }

                </div>
              </div>
              )
        }
      </Dialog>

    </SnackbarProvider>
    </>
  )
}

export default Ad_profile
