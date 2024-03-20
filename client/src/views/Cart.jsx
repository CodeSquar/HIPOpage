import { useEffect, useState, useContext } from "react"
import ProductCartItem from "../components/ProductCartItem"
import axios from "axios"
import { UserContext } from "../providers/UserProvider"
import { NavLink } from "react-router-dom"
import FetchClient from "../services/FerchClient"
import ApiServices from "../services/ApiServices"
import LoadingAnimation from "../components/LoadingAnimation"
import { useTransition, animated } from '@react-spring/web'

export default function Cart(params) {
    const { token, setToken, setIsAuth, setExpiresIn } = useContext(UserContext)
    const [cartProducts, setCartProducts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const apiServices = new ApiServices(FetchClient)
        const getCart = async () => {
            setLoading(true)
            try {
                const resCart = await apiServices.getCart(token)
                setCartProducts(resCart)

            } catch (err) {
                console.log(err)
                setToken(undefined)
                setIsAuth(false)
                setExpiresIn(undefined)
            }
            setLoading(false)
        };

        getCart();
    }, [token]);

    const transitions = useTransition(cartProducts?.cartWithDetails || [], {
        keys: (item) => item.id,
        from: { opacity: 0, y: 100 },
        enter: { opacity: 1, y: 0 },
        leave: { opacity: 0, y: 100 },
        trail: 200, // Delay entre cada elemento
    });

    return (
        !loading ? (
            <>
                <h2 className="font-bold text-base mt-4 text-neutral-400">Tu carrito</h2>
                <div className="flex flex-col lg:flex-row gap-4 mt-2 ">
                    <div className="flex flex-col  w-full gap-4">
                        {transitions((styles, item) => (
                            <animated.div style={styles} key={item.id}>
                                <ProductCartItem
                                    imageSrc={item.productDetail.images?.[0]}
                                    name={item.productDetail.name}
                                    finalPrice={item.productDetail.finalPrice}
                                    quantity={item.quantity}
                                    id={item.id}
                                    setLoading={setLoading}

                                />
                            </animated.div>
                        ))}
                        {cartProducts?.cartWithDetails?.length === 0 && (
                            <h2 className="text-red-500">No tienes productos en el carrito!</h2>
                        )}

                    </div>
                    {cartProducts?.cartWithDetails?.length > 0 &&
                        <div className="flex flex-col justify-between gap-8 bg-neutral-800  w-full lg:w-[25%] min-w-[25%] rounded-2xl p-8">
                            <div>
                                {cartProducts.cartWithDetails.map((product) => (

                                    <h2 className="flex justify-between text-neutral-400">{product.productDetail.name}<span className="font-bold"> x{product.quantity}</span></h2>
                                ))}

                                <h2 className="flex justify-between text-neutral-400">Subtotal: <span className="font-bold">{cartProducts.totalPrice}</span></h2>
                            </div>

                            <div>
                                <h2 className="flex justify-between text-xl">Total: <span className="font-black">${cartProducts?.totalPrice?.toString()}</span></h2>
                                <NavLink to="/carrito/comprar/" className="flex justify-center bg-white py-4 px-6 mt-4 w-full rounded-2xl text-black font-bold text-sm">Comprar</NavLink>
                            </div>

                        </div>}
                </div>
            </>
        ) : (
            <div className="flex justify-center w-full">
                <LoadingAnimation />
            </div>
        )
    )
}