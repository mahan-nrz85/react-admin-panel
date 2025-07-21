import { HomeOutlined , PeopleOutlineOutlined ,SettingsOutlined , Inventory2Outlined } from '@mui/icons-material';
import { lazy } from 'react';
const Ad_Dashboard = lazy(() => import('../pages/Ad_Dashboard'))
const Ad_Users = lazy(() => import('../pages/Ad_Users'))
const Ad_Product = lazy(() => import('../pages/Ad_Product'))
const Ad_Setting = lazy(() => import('../pages/Ad_Setting'))
const Ad_Admins = lazy(() => import('../pages/settingPages/Ad_Admins'))
const Ad_newProduct = lazy(() => import('../pages/productPage/Ad_newProduct'))
export const routes = [
    {
        path : '/dashboard',
        icon : <HomeOutlined />,
        label : 'داشبورد',
        element : <Ad_Dashboard /> ,
        children : []
    },
    {
        path : '/users',
        icon : <PeopleOutlineOutlined />,
        label : 'کاربران',
        element : <Ad_Users /> ,
        children : []
    },
    {
        path : '/product',
        icon : <Inventory2Outlined />,
        label : 'محصولات',
        element : <Ad_Product /> ,
        children : [
            {
                title : 'افزودن محصول',
                path : '/product/new-product',
                element : <Ad_newProduct />,
                icon : ''
            },
        ]
    },
    {
        path : '/setting',
        icon : <SettingsOutlined />,
        label : 'تنظیمات',
        element : <Ad_Setting /> ,
        children : [
            {
                title : 'لیست ادمین ها',
                path : '/setting/admins',
                element: <Ad_Admins />,
                icon : '',
            },
            {
                title : 'لیست کاربران ها',
                path : '/setting/users',
                element: <Ad_Admins />,
                icon : '',
            },
            {
                title : 'پشتیبانی',
                path : '/setting/backup',
                element: <Ad_Admins />,
                icon : '',
            },
        ]
    },
]