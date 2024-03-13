import { useState,useEffect} from "react"
import {NavLink,useLocation} from "react-router-dom"


export default function AdminHeader(params) {
    const [navActive, setNavActive] = useState(false)
    const location = useLocation();
    
        useEffect(() => {
       
        setNavActive(false);
    }, [location.pathname]);

    return (
        <>
            <header className="w-full bg-white py-4 px-6 flex justify-between items-center">
                <img className="w-8 aspect-square bg-neutral-500 rounded-full"></img>
                <div onClick={() => setNavActive(true)} className="block">
                    <div className="bg-neutral-500 h-1 w-8"></div>
                    <div className="bg-neutral-500 h-1 w-6 mt-1"></div>
                </div>

            </header>
            {navActive && (
                <nav className="left-0 top-0 bg-white w-full h-full fixed">
                    <ul className="  z-50 p-6 text-black font-bold space-y-2">
                        <div className="flex justify-end">
                            <button onClick={() => setNavActive(false)} className="text-end">X</button>
                        </div>

                        <li ><NavLink className="flex px-6 py-4 bg-neutral-100 rounded-xl" to="/admin">Inicio</NavLink></li>
                        <li ><NavLink className="flex px-6 py-4 bg-neutral-100 rounded-xl" to="./pedidos">Pedidos</NavLink></li>
                        <li ><NavLink className="flex px-6 py-4 bg-neutral-100 rounded-xl" to="./productos">Productos</NavLink></li>
                        <li ><NavLink className="flex px-6 py-4 bg-neutral-100 rounded-xl" to="./subir">Subir producto</NavLink></li>
                        <li ><NavLink className="flex px-6 py-4 bg-neutral-100 rounded-xl" to="./cerrassesion">Cerrar sesion</NavLink></li>
                    </ul>
                </nav>
            )}

        </>



    )
}