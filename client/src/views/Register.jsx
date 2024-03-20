import {NavLink} from "react-router-dom"
import ApiServices from "../services/ApiServices";
import FetchClient from "../services/FerchClient";
import { UserContext } from "../providers/UserProvider";
import { useContext, useState } from "react";

export default function Register(params) {
    const { setToken, setExpiresIn, setIsAuth } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleRegister = async (e) => {
        e.preventDefault();
        const apiServices =new ApiServices(FetchClient)
        const body = { username, password };
        try {
          const response = await apiServices.register(body)
          console.log(response)


            setToken(response.token);
            setExpiresIn(response.expiresIn);
            setIsAuth(true);

            // Manejar el caso en que la respuesta no es exitosa
            console.error("Error al registrarse:", response);

        } catch (error) {
          console.error("Error al realizar la solicitud:", error);
        }
      };
    return(
        <div className="flex justify-center items-center">
            <form onSubmit={handleRegister} className=" bg-neutral-800 flex flex-col w-full  sm:max-w-[400px] mt-16 py-8 px-8 rounded-md" >
                <h2 className="text-xl font-bold">Registrarse</h2>
                <label className="text-sm text-neutral-400 mt-4" htmlFor="">Usuario</label>
                <input className="bg-neutral-700 rounded py-2 px-4 mt-1" type="text" 
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                />
                <label className="text-sm text-neutral-400 mt-2" htmlFor="">Contraseña</label>
                <input className="bg-neutral-700 rounded py-2 px-4 mt-1" type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 />
                <button className="bg-amber-400 text-black text-sm font-bold rounded py-2 px-4 mt-8" type="submit">Registrarse</button>
                <button className="bg-white text-black text-sm font-bold rounded py-2 px-4 mt-2">Cancelar</button>
                <p className="text-sm text-neutral-400 mt-2 text-center">Ya tienes una cuenta? <NavLink className="text-white font-bold underline" to="/ingresar">Ingresar</NavLink></p>
            </form>
        </div>
    )
}