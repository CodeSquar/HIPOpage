import { NavLink, useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import ApiServices from "../../services/ApiServices"
import FetchClient from "../../services/FerchClient"
export default function AdminOrder(params) {
    const [saleInfo,setSaleInfo] = useState({})
    const {id} = useParams()
    const price = 2450
    const quantity = 3

    useEffect(() => {
        const apiServices = new ApiServices(FetchClient)
        const getSale = async () => {
            try {
                const res = await apiServices.getSale(id,token)
                setSales(res)
            } catch (err) {
                console.log(err)
            }
        }
        getSale()
    }, [])
    return(
        <div className="mx-6 bg-white rounded-2xl mt-12 overflow-hidden">
            <img src="https://acdn.mitiendanube.com/stores/575/267/products/dudimascotas1-77db8a31f93586947415590751720159-1024-1024.jpg" className="w-full"></img>
            <div className="w-full p-6">
                <h2 className="text-2xl font-black">Informacion del pedido</h2>
                <div id="separator" className="w-full h-[1px] bg-neutral-200 my-4"></div>
                <ul className="list-disc list-inside space-y-2">
                    <li className="">Nombre del producto: <span className="font-bold">Correa para perro</span></li>
                    <li className="">Cantidad: <span className="font-bold">2 unidades</span></li>
                    <li className="">ubicacion: <span className="font-bold">Joaquin castellanos 1670, Santa Maria de punilla</span></li>
                </ul>
                <div id="separator" className="w-full h-[1px] bg-neutral-200 my-4"></div>
                <p>Precio unidad:</p>
                <h2 className="text-2xl font-black">${price.toLocaleString()}</h2>
                <p className="mt-4">Pago:</p>
                <h2 className="text-2xl font-black">${(price * quantity).toLocaleString()}</h2>
                <NavLink className="uppercase w-full bg-cyan-600 rounded-2xl px-10 py-6 flex justify-center text-white font-black mt-6" to="/admin/products/123">ir al producto</NavLink>
            </div>          
        </div>
    )
}