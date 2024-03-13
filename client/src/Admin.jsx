import { Routes, Route } from 'react-router-dom';
import AdminHome from './views/admin/AdminHome';
import AdminHeader from './views/admin/AdminHeader';
import AdminOrders from './views/admin/AdminOrders';
import AdminOrder from './views/admin/AdminOrder';
import AdminPost from './views/admin/AdminPost';
export default function Admin(params) {
    document.documentElement.style.background = "#F4F4F4";
    return (
        <>
            <AdminHeader />
            <div className='text-black'>
                <Routes>
                    <Route  path='/' element={<AdminHome />}></Route>
                    <Route path='/pedidos' element={<AdminOrders />}></Route>
                    <Route path='/pedidos/:id' element={<AdminOrder />}></Route>
                    <Route path='/añadirproducto' element={<AdminPost />}></Route>
                </Routes>
            </div>
        </>

    )
}