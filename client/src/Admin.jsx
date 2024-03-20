import { Routes, Route } from 'react-router-dom';
import AdminHome from './views/admin/AdminHome';
import AdminHeader from './views/admin/AdminHeader';
import AdminOrders from './views/admin/AdminOrders';
import AdminOrder from './views/admin/AdminOrder';
import AdminPost from './views/admin/AdminPost';
import { UserContext } from './providers/UserProvider';
import { useContext } from 'react';
import AdminProducts from './views/admin/AdminProducts';
import AdminProduct from './views/admin/AdminProduct';
export default function Admin(params) {
    const {isAuth} = useContext(UserContext)
    document.documentElement.style.background = "#F4F4F4";

    return (
        <>
            {isAuth ? (
                <>
                    <AdminHeader />
                    <div className='text-black'>
                        <Routes>
                            <Route  path='/' element={<AdminHome />}></Route>
                            <Route  path='/productos' element={<AdminProducts />}></Route>
                            <Route  path='/productos/:id' element={<AdminProduct />}></Route>
                            <Route path='/pedidos' element={<AdminOrders />}></Route>
                            <Route path='/pedidos/:id' element={<AdminOrder />}></Route>
                            <Route path='/añadirproducto' element={<AdminPost />}></Route>
                        </Routes>
                    </div>
                </>
            ) : (
                <h2>Que haces aquí?</h2>
            )}
        </>
    );
    
}