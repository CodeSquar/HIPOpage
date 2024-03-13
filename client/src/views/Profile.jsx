import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserContext } from "../providers/UserProvider"
import Cart from "./Cart"
export default function Profile(params) {
    const {token,setIsAuth,setToken,setExpiresIn} = useContext(UserContext)
    const [userData,setUserData]= useState({}) 
    useEffect(()=>{
        const getUser = async()=>{
            try {
                const res = await axios.get("http://localhost:5000/api/userinfo",{
                    headers: {
                        Authorization: `${token}`
                    }
                })
                setUserData(res.data.user)
                console.log(res.data.user)
            } catch (err) {
                
            }
        }
        getUser()
    },[])

    return(
        <>
            <h2 className="text-2xl font-black mt-8">Perfil</h2>
            <p className="mt-4">Tu nombre de usuario: {userData.username}</p>
            {userData.isAdmin && <p className="mt-4 text-green-500">SOS ADMINISTRADOR</p>}
            <button className="mt-4 bg-red-500 bg-opacity-10 text-red-500 border border-red-500 px-6 py-4 rounded-2xl font-bold" onClick={()=>{setExpiresIn(undefined),setToken(undefined),setIsAuth(false)}}>Cerrar sesion</button>
        </>
      
    )
}