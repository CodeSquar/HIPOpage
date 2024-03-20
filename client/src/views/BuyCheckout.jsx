import { useEffect, useState, useContext } from "react"
import { useParams, NavLink, useNavigate, Navigate } from "react-router-dom"
import axios from "axios"
import { UserContext } from "../providers/UserProvider"
import ApiServices from "../services/ApiServices"
import FetchClient from "../services/FerchClient"
import ProductCartItem from "../components/ProductCartItem"
import LoadingAnimation from "../components/LoadingAnimation"
/*import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"
initMercadoPago('APP_USR-45bdab1f-f790-4fce-90c8-7b4e6d854781', { locale: "es-AR" });*/

export default function BuyCheckout() {
    const { token, isAuth } = useContext(UserContext)
    const [userId, setUserId] = useState("")
    const [cartProducts, setCartProducts] = useState({})
    const [loadingCart, setLoadingCart] = useState(true)

    //shipment states
    const [zipCode, setZipCode] = useState()
    const [state, setState] = useState()
    const [city, setCity] = useState()
    const [streetName, setStreetName] = useState()
    const [streetNumber, setStreetNumber] = useState()
    const apiServices = new ApiServices(FetchClient)
    useEffect(() => {

        const getCart = async () => {
            setLoadingCart(true)
            try {
                const res = await apiServices.getCart(token)
                setCartProducts(res)

            } catch (error) {
                console.log(err)
            }
            setLoadingCart(false)
        }
        getCart()
    }, [])
    useEffect(() => {

        const getUser = async () => {
            try {
                const res = await apiServices.getUser(token)
                console.log(res.user._id)
                setUserId(res.user._id)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [])

    const postPreferences = async () => {
        const preferenceData =
        {
            userId: userId,
            zipCode,
            state,
            city,
            streetName,
            streetNumber,
        }
        console.log(preferenceData)
        if (!state || !city || !zipCode || !streetName || !streetNumber) {
            console.log("faltan datos tio!!!")
        }

        try {
            const response = await apiServices.payment(preferenceData, token)


            window.location.href = response.init_point

        } catch (err) {
            console.log(err)
        }

    };



    return (
        !loadingCart ? (
            <div className="block mt-8">
                <div>
                    {cartProducts?.cartWithDetails?.map((product) => (
                        <ProductCartItem
                            imageSrc={product.productDetail.images?.[0]}
                            name={product.productDetail.name}
                            finalPrice={product.productDetail.finalPrice}
                            quantity={product.quantity}
                            id={product.id}
                        />
                    ))}
                </div>
                <div className="block w-full mt-8">
                    <div className="flex flex-col gap-4 [&>input]:bg-neutral-900 [&>input]:p-4 [&>input]:border-b [&>input]:outline-none">
                        <input
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder="Código Postal"
                            className="focus:bg-neutral-700"
                        />

                        <input
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="Provincia"
                            className="focus:bg-neutral-700"
                        />

                        <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Ciudad"
                            className="focus:bg-neutral-700"
                        />

                        <input
                            value={streetName}
                            onChange={(e) => setStreetName(e.target.value)}
                            placeholder="Calle"
                            className="focus:bg-neutral-700"
                        />

                        <input
                            value={streetNumber}
                            onChange={(e) => setStreetNumber(e.target.value)}
                            placeholder="Número de Calle o departamento"
                            className="focus:bg-neutral-700"
                        />
                    </div>

                    {!isAuth ?
                        <NavLink className="flex justify-center items-center h-16 w-full aspect-square rounded-xl bg-white py-2 px-4 text-black font-bold text-base mt-8" to="/registro">Registrate para comprar</NavLink>
                        : <button className="flex justify-center items-center h-16 w-full aspect-square rounded-xl bg-white py-2 px-4 text-black font-bold text-base mt-8" onClick={() => postPreferences()}>Ir al pago con mercado pago</button>}
                    <NavLink to={"/carrito"} className="flex justify-center items-center h-16 w-full aspect-square rounded-xl bg-neutral-600 py-2 px-4 mt-4 text-black font-bold text-base">Cancelar</NavLink>
                </div>

            </div>
        ) : (
            <div className="flex justify-center w-full">
               <LoadingAnimation/>
            </div>

        )


    )
}