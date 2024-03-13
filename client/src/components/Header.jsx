import { NavLink } from "react-router-dom"
import { UserContext } from "../providers/UserProvider"
import { useContext,useEffect} from "react"
import axios from "axios"
export default function Header(params) {
    const {token,isAuth} = useContext(UserContext)

  
    return (
        <header className="flex justify-center items-center  px-4 h-24">
            <div className="w-full max-w-[1300px] flex justify-between items-center">
                <NavLink to="/"><img src="/vite.svg"></img></NavLink>
                <nav className="hidden sm:flex">
                    <ul className="flex items-center gap-8 font-normal uppercase text-sm">
                    <li> <NavLink className="flex items-center gap-2" to="/productos">Productos</NavLink> </li>
                        {isAuth
                            ? (<>
                                <li> <NavLink className="flex items-center gap-2" to="/carrito">Carrito <svg viewBox="0 0 24.00 24.00" height="16px" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></NavLink> </li>

                                <li> <NavLink className="flex items-center gap-2" to="/perfil">Perfil <svg height="16px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.144"></g><g id="SVGRepo_iconCarrier"> <g id="style=stroke"> <g id="profile"> <path id="vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C9.92893 2.75 8.25 4.42893 8.25 6.5C8.25 8.57107 9.92893 10.25 12 10.25C14.0711 10.25 15.75 8.57107 15.75 6.5C15.75 4.42893 14.0711 2.75 12 2.75ZM6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z" fill="#FFFFFF"></path> <path id="rec (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714ZM9.57143 14.75C7.46091 14.75 5.75 16.4609 5.75 18.5714C5.75 20.0508 6.94924 21.25 8.42857 21.25H15.5714C17.0508 21.25 18.25 20.0508 18.25 18.5714C18.25 16.4609 16.5391 14.75 14.4286 14.75H9.57143Z" fill="#FFFFFF"></path> </g> </g> </g></svg></NavLink> </li>
                            </>
                            )
                            : (
                                <>
                                    <li><NavLink to="/ingresar">Ingresar</NavLink></li>
                                    <li><NavLink to="/registro">Registrarse</NavLink></li>
                                </>
                            )}

                    </ul>
                </nav>
            </div>
        </header>
    )
}