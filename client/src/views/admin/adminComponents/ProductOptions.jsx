
import { useEffect,useContext } from "react"
import { UserContext } from "../../../providers/UserProvider"
import ApiServices from "../../../services/ApiServices"
import FetchClient from "../../../services/FerchClient"

export default function ProductOptions(props) {
    const {products,setProducts,setActive,id} = props 
    const {token} = useContext(UserContext)


        const handleDeleteProduct = async () =>{
            const apiServices = new ApiServices(FetchClient)
            try {
                const res = await apiServices.deleteProduct(id,token)
                const index = products.findIndex(product => product._id === id);
                if (index !== -1) {
                    const updatedProducts = [...products.slice(0, index), ...products.slice(index + 1)];
                    setProducts(updatedProducts);
                }
            } catch (error){
                console.log(error)
            }
        }
    
    return(
        <div className="w-52 absolute bg-white p-8 right-0 top-0 z-10 rounded-2xl shadow-2xl shadow-neutral-200 border m-2">
            <div className="flex justify-between pb-4 mb-4 border-b ">
                <h3 className="font-regular text-base">Opciones</h3>
                <svg onClick={()=>setActive(false)} className="w-4 cursor-pointer" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 21.32L21 3.32001" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 3.32001L21 21.32" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            <ul className="flex flex-col gap-2">
                <li className="w-full flex justify-center py-4 bg-neutral-100 rounded-xl font-bold cursor-pointer">Editar</li>
                <li onClick={()=>handleDeleteProduct()} className="w-full flex justify-center py-4 bg-neutral-100 rounded-xl font-bold cursor-pointer">Borrar</li>
            </ul>
        </div>
    )
}