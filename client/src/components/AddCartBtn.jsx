import { useContext, useEffect, useState } from "react"
import { UserContext } from "../providers/UserProvider";
import ApiServices from "../services/ApiServices";
import FetchClient from "../services/FerchClient";
import { useTransition, animated } from "@react-spring/web";
import LoadingAnimation from "./LoadingAnimation";

export default function AddCartBtn(props) {
    const { product } = props
    const { token } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setAdded(false);
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [added]);

    const transition = useTransition(added, {
        from: { y:100, opacity: 0 },
        enter: { y:0, opacity: 1 },
        leave: {y:-100, opacity: 0 }
    })
    const handleSubmitCartProduct = async () => {
        setLoading(true)
        const apiServices = new ApiServices(FetchClient)
        try {
            const response = await apiServices.postCart(product, token)
            setAdded(true)

        } catch (err) {
            console.log(err);
        }
        setLoading(false)
    }
    return (
        <>
            <button onClick={() => handleSubmitCartProduct()} className="gap-4 w-full flex justify-center items-center h-full aspect-square rounded-xl bg-black py-2 px-4 text-white font-bold text-base">
                {loading ? <><LoadingAnimation className="w-6" /></> : <>Agregar al carrito <img className="invert h-6" src="/cart.svg"></img></>}
            </button>
          
                {transition((style,item) =>
                item ?
                    <animated.div style={style} className="fixed bottom-0 right-0 m-16 px-12 py-8 rounded-2xl bg-white font-bold text-black">
                        Agregado al carrito!!!
                    </animated.div> : '')}

            

        </>


    )
}