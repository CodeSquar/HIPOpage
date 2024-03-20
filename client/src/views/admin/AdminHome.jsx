import { NavLink } from "react-router-dom"

export default function AdminHome(params) {
    return (
        <div className="flex justify-center w-full">
            <div className="max-w-[1000px] w-full mx-6">
                <h2 className="font-black text-2xl mt-8">Productos y pedidos</h2>
                <NavLink to="./productos" className="font-bold flex gap-4 w-full bg-white rounded-2xl py-6 px-10 mt-8"><img src="/order.svg"></img>Productos</NavLink>
                <NavLink to="./pedidos" className="font-bold flex gap-4 w-full bg-white rounded-2xl py-6 px-10 mt-4"><img src="/product.svg"></img> Pedidos</NavLink>
                <NavLink to="./añadirproducto" className="font-black flex justify-center w-full text-white bg-cyan-600 rounded-2xl py-6 px-10 mt-8 uppercase">Añadir producto +</NavLink>
            </div>
        </div>


    )
}