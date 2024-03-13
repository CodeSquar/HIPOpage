import { NavLink } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { useContext, useState } from "react";

export default function Login() {
  const { setToken, setExpiresIn, setIsAuth } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { username, password };
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
   
      if (response.ok) {
        const responseData = await response.json();
        setToken(responseData.token);
        setExpiresIn(responseData.expiresIn);
        setIsAuth(true);
      } else {
        // Manejar el caso en que la respuesta no es exitosa
        console.error("Error al iniciar sesión:", response);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="bg-neutral-800 flex flex-col w-full sm:max-w-[400px] mt-16 py-8 px-8 rounded-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-xl font-bold">Ingresar</h2>
        <label className="text-sm text-neutral-400 mt-4" htmlFor="">
          Usuario
        </label>
        <input
          className="bg-neutral-700 rounded py-2 px-4 mt-1"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="text-sm text-neutral-400 mt-2" htmlFor="">
          Contraseña
        </label>
        <input
          className="bg-neutral-700 rounded py-2 px-4 mt-1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-amber-400 text-black text-sm font-bold rounded py-2 px-4 mt-8"
          type="submit"
        >
          Ingresar
        </button>
        <button
          className="bg-white text-black text-sm font-bold rounded py-2 px-4 mt-2"
          type="button"
        >
          Cancelar
        </button>
        <p className="text-sm text-neutral-400 mt-2 text-center">
          No tienes una cuenta?{" "}
          <NavLink className="text-white font-bold underline">
            Registrarse
          </NavLink>
        </p>
      </form>
    </div>
  );
}
