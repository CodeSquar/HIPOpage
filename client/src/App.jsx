import { useContext, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route,Navigate  } from "react-router-dom"
//views
import Home from './views/Home'
import Header from './components/Header'
import Product from './views/Product'
import Products from './views/Products'
import BuyCheckout from './views/BuyCheckout'
import Login from './views/Login'
import Register from './views/Register'
import MercadoPagoPayment from './components/MercadoPagoPayment'
import Cart from './views/Cart'
import Success from './views/Succes'
import Profile from './views/Profile'
//admin
import Admin from './Admin'
//context and provider
import { UserContext } from './providers/UserProvider'


function App() {
  const { isAuth } = useContext(UserContext)

  return (

      <BrowserRouter>
        {!location.pathname.startsWith("/admin") && <Header />}
        <div className='w-full flex justify-center px-4 sm:px-8'>
          <div className='w-[100%] max-w-[1300px]'>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/productos/" element={<Products />} />
              <Route exact path="/productos/:id" element={<Product />} />
              <Route exact path="/productos/:id/buy" element={<BuyCheckout />} />

              <Route exact path="/mercadopago" element={<MercadoPagoPayment />} />

              <Route exact path="/success" element={<Success />} />

              <Route path="/carrito" element={isAuth ? <Cart /> : <Navigate to="/ingresar" />} />
              <Route path="/perfil" element={isAuth ? <Profile />: <Navigate to="/ingresar" />} />
              <Route path="/ingresar" element={!isAuth ? <Login /> : <Navigate to="/" />} />
              <Route path="/registro" element={!isAuth ? <Register />: <Navigate to="/" />} />
            </Routes>
          </div>
        </div>
        <Routes>
          <Route exact path="/admin/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>

  )
}

export default App
