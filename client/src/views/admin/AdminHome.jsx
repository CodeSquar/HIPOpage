import { NavLink } from "react-router-dom"

export default function AdminHome(params) {
    const actualMonthSells = 15
    const prevMonthSells = 12
    const allTimeSells = 55
    const sellDifferense = Math.round((actualMonthSells - prevMonthSells) / (actualMonthSells + prevMonthSells / 2) * 100 )

    const actualMonthIntake = 50000
    const prevMonthIntake = 40302
    const allTimeIntake  = 1056045
    const intakeDifferense = Math.round((actualMonthIntake - prevMonthIntake) / (actualMonthIntake + prevMonthIntake / 2) * 100 )

    
    return (
        <div className="mx-6">
            <h2 className="font-bold mt-12">Ventas y ganancias este mes:</h2>
            <div className="w-full bg-white rounded-2xl p-6 mt-4">
                <p className="text-sm font-bold text-neutral-500">Ventas</p>
                <div className="flex gap-4 mt-2 items-center">
                <p className="text-2xl font-black text-cyan-600">{actualMonthSells}</p><span style={sellDifferense < 0 ? {rotate:"180deg"}:null} className="text-cyan-600 font-black">↑</span><p className="font-black text-2xl text-neutral-500">{prevMonthSells}</p>
                </div>
                
                <p className="font-bold text-sm text-cyan-600">{sellDifferense}% {sellDifferense > 0 ? "mas" : "menos"} que el mes pasado</p>
            </div>
            <div className="w-full bg-white rounded-2xl p-6 mt-4">
                <p className="text-sm font-bold text-neutral-500">Ganancias</p>
                <div className="flex gap-4 mt-2 items-center">
                <p className="text-2xl font-black text-cyan-600">${actualMonthIntake.toLocaleString()}</p>
                <span  style={intakeDifferense < 0 ? {rotate:"180deg"}:null} className="text-cyan-600 font-black">↑</span>
                <p className="font-black text-2xl text-neutral-500">${prevMonthIntake.toLocaleString()}</p>
                </div>
                
                <p className="font-bold text-sm text-cyan-600">{intakeDifferense}% {intakeDifferense > 0 ? "mas" : "menos"} que el mes pasado</p>
            </div>

            <h2 className="font-bold mt-6">Ventas y ganancias todo el tiempo:</h2>
            <div className="w-full bg-white rounded-2xl p-6 mt-4">
                <p className="text-sm font-bold text-neutral-500">Ventas</p>
                <div className="flex gap-4 mt-2 items-center">
                <p className="text-2xl font-black text-cyan-600">{allTimeSells}</p>
                </div>
                
            </div>
            <div className="w-full bg-white rounded-2xl p-6 mt-4">
                <p className="text-sm font-bold text-neutral-500">Ganancias</p>
                <div className="flex gap-4 mt-2 items-center">
                <p className="text-2xl font-black text-cyan-600">${allTimeIntake.toLocaleString()}</p>
                </div>

            </div>
            <h2 className="font-bold mt-6">Productos y pedidos</h2>
            <NavLink to="./productos" className="font-bold flex gap-4 w-full bg-white rounded-2xl py-6 px-10 mt-4"><img src="/order.svg"></img>Productos</NavLink>
            <NavLink to="./pedidos" className="font-bold flex gap-4 w-full bg-white rounded-2xl py-6 px-10 mt-4"><img src="/product.svg"></img> Pedidos</NavLink>
            <NavLink to="./añadirproducto" className="font-black flex justify-center w-full text-white bg-cyan-600 rounded-2xl py-6 px-10 mt-4 uppercase">Añadir producto +</NavLink>
        </div>

    )
}