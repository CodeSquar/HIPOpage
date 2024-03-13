import { useEffect, useState,useContext } from "react"
import ProductCartItem from "../components/ProductCartItem"
import axios from "axios"
import { UserContext } from "../providers/UserProvider"

export default function Cart(params) {
    const {token,setToken,setIsAuth,setExpiresIn} = useContext(UserContext) 
    const [cartProducts, setCartProducts] = useState([])

    useEffect(() => {
        const getCart = async () => {
            try {
                const resCart = await axios.get("http://localhost:5000/api/cart", {
                    headers: {
                        Authorization: `${token}`
                    }
                });
             setCartProducts(resCart.data)
             console.log(resCart.data.cartWithDetails)
              
            } catch (err) {
               console.log(err)
                setToken(undefined)
                setIsAuth(false)
                setExpiresIn(undefined)
            }
        };
    
        getCart();
    }, [token]);
    const postPreferences = async () => {
        const preferenceData =
        {
            products:cartProducts,
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
        <>
            <h2 className="font-bold text-base mt-4 text-neutral-400">Tu carrito</h2>
            <div className="flex flex-col lg:flex-row gap-2 mt-2 ">
                <div className="flex flex-col  w-full gap-2">
                    {cartProducts?.cartWithDetails?.length > 0 ?  
                    cartProducts?.cartWithDetails.map((product) => (
                        
                        <ProductCartItem
                            imageSrc={product.productDetail.images?.[0]}
                            name={product.productDetail.name}
                            finalPrice={product.productDetail.finalPrice}
                            quantity={product.quantity}
                        />
                    )): <h2 className="text-red-500">No tienes productos en el carrito!</h2>}
                   
                </div>
                <div className="flex flex-col justify-between gap-8 bg-neutral-800 w-full lg:w-[25%] min-w-[25%] rounded-md p-8">
                    <div>
                        <h2 className="flex justify-between text-neutral-400">Productos: <span className="font-bold">{cartProducts.length}</span></h2>
                        <h2 className="flex justify-between text-neutral-400">Subtotal: <span className="font-bold">{cartProducts.totalPrice}</span></h2>
                    </div>

                    <div>
                        <h2 className="flex justify-between text-xl">Total: <span className="font-black">${cartProducts?.totalPrice?.toString()}</span></h2>
                        <button className="bg-white py-4 px-6 mt-4 w-full rounded-2xl text-black font-bold text-sm">Comprar</button>
                    </div>

                </div>
            </div>

        </>

    )
}