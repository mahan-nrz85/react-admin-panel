import { HomeOutlined , PeopleOutlineOutlined ,SettingsOutlined , Inventory2Outlined } from '@mui/icons-material';
import { lazy } from 'react';
const Ad_Dashboard = lazy(() => import('../pages/Ad_Dashboard'))
const Ad_Users = lazy(() => import('../pages/Ad_Users'))
const Ad_Product = lazy(() => import('../pages/Ad_Product'))
const Ad_Setting = lazy(() => import('../pages/Ad_Setting'))
export const routes = [
    {
        path : '/dashboard',
        icon : <HomeOutlined />,
        label : 'داشبورد',
        element : <Ad_Dashboard />
    },
    {
        path : '/users',
        icon : <PeopleOutlineOutlined />,
        label : 'کاربران',
        element : <Ad_Users />
    },
    {
        path : '/product',
        icon : <Inventory2Outlined />,
        label : 'محصولات',
        element : <Ad_Product />
    },
    {
        path : '/setting',
        icon : <SettingsOutlined />,
        label : 'تنظیمات',
        element : <Ad_Setting />
    },
]