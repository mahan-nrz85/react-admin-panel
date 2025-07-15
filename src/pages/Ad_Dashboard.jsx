import React from 'react'
import AdminLayout from '../layout/AdminLayout'
import {PeopleAlt, Article , DocumentScanner , BarChart , AreaChart} from '@mui/icons-material';
import { Link } from 'react-router';
import Chart from '../components/Chart';
import ChartPie from '../components/ChartPie';
import { AnimatePresence, motion } from "motion/react"
function Ad_Dashboard() {
  return (
    <AdminLayout>
      <AnimatePresence
        exitBeforeEnter
      >
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
        <div className='grid grid-cols-2 gap-3'>
          <div className='flex flex-col'>
          {/* status Cards */}
            <div className='grid grid-cols-3  gap-2 w-[100%]'>
              <div className='users-count w-[100%] h-24 rounded-2xl place-content-center !p-2 text-center backdrop-blur-md bg-white/30'>
                <Link to={'/users'}>
                  <div className='flex items-center justify-center gap-1'>
                    <span>
                      <PeopleAlt />
                    </span>
                      <h2>تعداد کاربران</h2>
                  </div>
                </Link>
                <p>180</p>
              </div>
              <div className='users-count w-[100%] h-24 rounded-2xl place-content-center !p-2 text-center backdrop-blur-md bg-white/30'>
                <div className='flex items-center justify-center gap-1'>
                  <span>
                    <DocumentScanner />
                  </span>
                  <h2>تعداد پست ها</h2>
                </div>
                <p>10</p>
              </div>
              <div className='users-count w-[100%] h-24 rounded-2xl place-content-center !p-2 text-center backdrop-blur-md bg-white/30'>
                <div className='flex items-center justify-center gap-1'>
                  <span>
                    <Article />
                  </span>
                  <h2>تعداد مقالات</h2>
                </div>
                <p>80</p>
              </div>
            </div>
          {/* Top users */}
            <div className='!mt-4 bg-white/30 rounded-2xl !p-5 text-2xl '>
              <div className='flex items-center gap-2'>
                <PeopleAlt style={{width : '32px' , height : '32px'}}/>
                <h2 className='font-semibold'>کاربران برتر ماه</h2>
              </div>
              <div className='bg-black/60 !mt-4 rounded-2xl !p-3 h-48 overflow-y-scroll scroll-cus'>
                  <div className='user-item grid grid-cols-4  prose text-[14px] font-semibold text-center'>
                    <p>شناسه</p>  
                    <p>نام و نام خانوادگی</p>
                    <p>وضعیت</p>
                    <p>مقدار پرداختی</p>
                  </div> 
                  <div className='grid grid-cols-4 prose text-[14px] text-center !mt-2'>
                    <p>1</p>  
                    <p>ماهان نوروزی</p>
                    <p className='!p-1 bg-green-900 rounded-2xl text-green-500'>پرداخت شده</p>
                    <p>135,000,000</p>
                  </div>
                  <div className='grid grid-cols-4 prose text-[14px] text-center !mt-3'>
                    <p>2</p>
                    <p>علی نوروزی</p>
                    <p className='!p-1 bg-green-900 text-green-500 rounded-2xl'>پرداخت شده</p>
                    <p>15,000,000</p>
                  </div>
                  <div className='grid grid-cols-4 prose text-[14px] text-center !mt-3'>
                    <p>3</p>
                    <p>عماد نوروزی</p>
                    <p className='!p-1 bg-yellow-600 text-yellow-400 rounded-2xl'>در انتظار</p>
                    <p>1,000,000</p>
                  </div>
                  <div className='grid grid-cols-4 prose text-[14px] text-center !mt-3'>
                    <p>4</p>
                    <p>مهیار نوروزی</p>
                    <p className='!p-1 bg-red-800 text-red-500 rounded-2xl'>لغو شده</p>
                    <p>15,000,00</p>
                  </div>
                  <div className='grid grid-cols-4 prose text-[14px] text-center !mt-3'>
                    <p>5</p>
                    <p>حسین نوروزی</p>
                    <p className='!p-1 bg-red-800 text-red-500 rounded-2xl'>لغو شده</p>
                    <p>17,000,000</p>
                  </div>
                  <div className='grid grid-cols-4 prose text-[14px] text-center !mt-3'>
                    <p>6</p>
                    <p>حسین نوروزی</p>
                    <p className='!p-1 bg-green-900 text-green-500 rounded-2xl'>پرداخت شده</p>
                    <p>17,000,000</p>
                  </div>
                  <div className='grid grid-cols-4 prose text-[14px] text-center !mt-3'>
                    <p>7</p>
                    <p>حسین نوروزی</p>
                    <p className='!p-1 bg-green-900 text-green-500 rounded-2xl'>پرداخت شده</p>
                    <p>17,000,000</p>
                  </div>
              </div>
            </div>
          {/* end Top */}
          {/* SSite Status */}
          <div className='flex gap-2'>
            <div className='!mt-4 bg-white/30 rounded-2xl !p-3 w-[50%]'>
                <div className='flex items-center gap-2'>
                  <AreaChart style={{width : '28px' , height : '28px'}}/>
                  <h2 className='font-semibold'>صفحات پر بازدید</h2>
                </div>
                <div className='!mt-3'>
                  <div className='flex justify-between prose text-[14px] border-b border-gray-400 !p-2'>
                    <p>محصولات آرایشی</p>
                    <p>150K</p>
                  </div>
                  <div className='flex justify-between prose text-[14px] border-b border-gray-400 !p-2'>
                    <p>محصولات بهداشتی</p>
                    <p>150K</p>
                  </div>
                  <div className='flex justify-between prose text-[14px] border-b border-gray-400 !p-2'>
                    <p>بلاگ</p>
                    <p>15K</p>
                  </div>
                  <div className='flex justify-between prose text-[14px] border-b border-gray-400 !p-2'>
                    <p>ارتباط با ما</p>
                    <p>10K</p>
                  </div>
                </div>
            </div>
            <div className='!mt-4 bg-white/30 rounded-2xl !p-3 w-[50%]'>
                <div className='flex items-center gap-2'>
                  <AreaChart style={{width : '32px' , height : '32px'}}/>
                  <h2 className='font-semibold'>دسته بندی های پر فروش</h2>
                </div>
                <ChartPie />
            </div>

          </div>
          </div>
          {/* chart */}
          <div className='chart overflow-hidden h-[500px] bg-white/30 rounded-2xl'>
            <div className='flex items-center gap-2 !p-5'>
              <BarChart style={{width : '36px' , height : '36px'}}/>
              <h2 className='text-2xl font-semibold'>فروش ماهیانه</h2>
            </div>
            <Chart />
          </div>
          {/* end chart */}
        </div>
        </motion.div>
      </AnimatePresence>
      </AdminLayout>
  )
}

export default Ad_Dashboard
