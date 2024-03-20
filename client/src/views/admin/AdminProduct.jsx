import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import ApiServices from "../../services/ApiServices";
import FetchClient from "../../services/FerchClient";
export default function AdminProduct() {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    useEffect(() => {
        const apiServices = new ApiServices(FetchClient)
        const getProducts = async () => {
            try {
                const res = await apiServices.getProduct(id)
                setProduct(res)
            } catch (error) {
                console.log(err)
            }
        }
        getProducts()
    }, [])
    return (
        <div className="w-full flex justify-center px-6 mt-8 ">
            <div className="max-w-[1000px] w-full mx-auto">
                <div className="flex w-full gap-6">
                    <img className="aspect-square h-max object-contain bg-white flex-1 min-w-0 rounded-2xl shadow-2xl shadow-neutral-300" src={product?.images?.[0]}></img>
                    <div className="flex-1 [&>div>medium]:font-bold  [&>div>input]:block [&>div>input]:w-full [&>div>input]:bg-transparent [&>div>input]:border-b [&>div>input]:border-neutral-300 [&>div>input]:mt-2 [&>div>input]:outline-none">
                        <h2 className="text-2xl font-black">{product.name}</h2>
                        <div className="block mt-6 ">
                            <label>Descripcion:</label>
                            <input placeholder={product.description}></input>
                        </div>
                        <div className="block mt-6 ">
                            <label>Precio:</label>
                            <input placeholder={product.price}></input>
                        </div>
                        <div className="block mt-6 ">
                            <label>Descuento:</label>
                            <input placeholder={product.discountPercentage}></input>
                        </div>
                        <div className="block mt-6 ">
                            <label>Precio final (descuento aplicado):</label>
                            <p className="mt-2 font-bold">${product.finalPrice}</p>
                        </div>
                       
                        <div className="block mt-6 ">
                            <label>Cantidad disponible:</label>
                            <input placeholder={product.quantityAvailable}></input>
                        </div>
                        <div className="block mt-6 ">
                            <label>peso:</label>
                            <input placeholder={product.weight >= 1000 ? `${product.weight / 1000} kg` : `${product.weight} g`}></input>
                        </div>
                        <button
                        className="mt-8 font-black flex justify-center w-full text-white bg-cyan-600 rounded-2xl py-6 px-10 uppercase"
                        type="submit"
                    >
                        EDITAR

                    </button>
                    </div>
                </div>
            </div>
        </div>


    )
}