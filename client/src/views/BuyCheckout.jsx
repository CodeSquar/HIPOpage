import { useEffect, useState, useContext } from "react"
import { useParams, NavLink, useNavigate, Navigate } from "react-router-dom"
import axios from "axios"
import { UserContext } from "../providers/UserProvider"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"
initMercadoPago('APP_USR-45bdab1f-f790-4fce-90c8-7b4e6d854781', { locale: "es-AR" });

export default function BuyCheckout() {
    const navigate = useNavigate()
    //TODO: Hacer pasarela de pago usando mercado pago
    const { token, isAuth } = useContext(UserContext)
    const [product, setProduct] = useState({})
    const [paymentResponse, setPaymentResponse] = useState({})

    //shipment states
    const [zipCode, setZipCode] = useState()
    const [state, setState] = useState()
    const [city, setCity] = useState()
    const [streetName, setStreetName] = useState()
    const [streetNumber, setStreetNumber] = useState()

    const { id } = useParams()
    useEffect(() => {

        const getProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`)
                setProduct(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProduct()
    }, [])

    const postPreferences = async () => {
        const preferenceData =
        {
            id: product._id,
            quantity: 1,
            zipCode,
            state,
            city,
            streetName,
            streetNumber,
        }
        if(!state || !city || !zipCode || !streetName || !streetNumber){
            return
        }

        try {
            const response = await axios.post('http://localhost:5000/api/payment', preferenceData, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                }
            })
            window.location.href = response.data.init_point

        } catch (err) {
            console.log(err)
        }

    };



    return (
        product && (
            <div className="flex flex-col lg:flex-row  w-full gap-4 lg:gap-8 mt-8 lg:p-16 lg:bg-neutral-800 rounded-3xl">
                <div className="flex-1">

                    <img className="rounded-xl w-full aspect-square object-contain bg-white" src={product.images?.[0]}></img>

                </div>
                <div className="flex-1 flex flex-col justify-between">

                    <h2 className="font-black text-3xl">{product.name}</h2>
                    <div className="block w-full mt-16 [&>input]:bg-neutral-900 [&>input]:p-4">
                        <input
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder="Código Postal"
                        />

                        <input
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="Provincia"
                        />

                        <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Ciudad"
                        />

                        <input
                            value={streetName}
                            onChange={(e) => setStreetName(e.target.value)}
                            placeholder="Calle"
                        />

                        <input
                            value={streetNumber}
                            onChange={(e) => setStreetNumber(e.target.value)}
                            placeholder="Número de Calle o departamento"
                        />

                        <h2 className="mb-4 flex flex-col font-bold text-sm col-span-2 text-neutral-400">Precio final: <span className="font-black text-2xl text-white">$ {product.finalPrice?.toLocaleString()}</span></h2>
                        {!isAuth ?
                            <NavLink className="flex justify-center items-center h-16 w-full aspect-square rounded-xl bg-white py-2 px-4 text-black font-bold text-base mb-4" to="/registro">Registrate para comprar</NavLink>
                            : <button className="flex justify-center items-center h-16 w-full aspect-square rounded-xl bg-white py-2 px-4 text-black font-bold text-base" onClick={() => postPreferences()}>Ir al pago con mercado pago</button>}
                        <NavLink to={"/productos/" + product._id} className="flex justify-center items-center h-16 w-full aspect-square rounded-xl bg-neutral-600 py-2 px-4 mt-4 text-black font-bold text-base">Cancelar</NavLink>
                    </div>
                </div>
            </div>
        )



    )
}