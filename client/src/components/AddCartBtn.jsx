import { useContext, useEffect } from "react"
import { UserContext } from "../providers/UserProvider";
export default function AddCartBtn(props) {
    const {product} = props
    console.log(product)
    const {token} = useContext(UserContext)
    const handleSubmitCartProduct = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`
                },
                body:  JSON.stringify({productInfo:product }),
            });

            if (response.ok) {
                console.log("Producto agregado al carrito correctamente.");
            } else {
                console.error("Error al agregar el producto al carrito:", response);
            }
        } catch (err) {
            console.error(err);
        }
    }
    return(
        <button onClick={()=>handleSubmitCartProduct()} className="gap-4 w-full flex justify-center items-center h-full aspect-square rounded-xl bg-black py-2 px-4 text-white font-bold text-base">Agregar al carrito<img className="invert h-6" src="/cart.svg"></img></button>
    )
}