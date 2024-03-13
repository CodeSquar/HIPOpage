import {NavLink} from "react-router-dom"

export default function Register(params) {
    return(
        <div className="flex justify-center items-center">
            <form className=" bg-neutral-800 flex flex-col w-full  sm:max-w-[400px] mt-16 py-8 px-8 rounded-md" action="">
                <h2 className="text-xl font-bold">Registrarse</h2>
                <label className="text-sm text-neutral-400 mt-4" htmlFor="">Usuario</label>
                <input className="bg-neutral-700 rounded py-2 px-4 mt-1" type="text" />
                <label className="text-sm text-neutral-400 mt-2" htmlFor="">Contraseña</label>
                <input className="bg-neutral-700 rounded py-2 px-4 mt-1" type="password" />
                <button className="bg-amber-400 text-black text-sm font-bold rounded py-2 px-4 mt-8" type="submit">Ingresar</button>
                <button className="bg-white text-black text-sm font-bold rounded py-2 px-4 mt-2">Cancelar</button>
                <p className="text-sm text-neutral-400 mt-2 text-center">Ya tienes una cuenta? <NavLink className="text-white font-bold underline" to="/ingresar">Ingresar</NavLink></p>
            </form>
        </div>
    )
}