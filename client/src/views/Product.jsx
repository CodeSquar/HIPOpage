import { useContext, useEffect, useState } from "react"
import { UserContext } from "../providers/UserProvider"
import axios from "axios"
import { useParams, NavLink } from "react-router-dom"
import ImagesCarousel from "../components/ImagesCarousel"
import AddCartBtn from "../components/AddCartBtn"

export default function Product(params) {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [quantity,setQuantity] = useState(1)
    const { isAuth } = useContext(UserContext);
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
    return (
        product ? (
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mt-4 sm:mt-8 lg:p-16 lg:bg-neutral-800 rounded-3xl">

                <ImagesCarousel
                    images={product?.images}
                />
                <div className="flex flex-col justify-between flex-1">
                    <div className="w-full">
                        <h2 className="text-3xl  font-black line-clamp-2">{product.name}</h2>
                        <p className="text-neutral-400 mt-4">{product.description}</p>

                    </div>
                    <div className="gap-2 mt-8">
                        <div className="flex flex-col sm:flex-row w-full items-start sm:items-end justify-between">
                            {product.discountPercentage ? (
                                <div className="block">
                                    <p className="text-sm font-bold text-neutral-400 line-through mt-4">$ {product.price}</p>
                                    <div className="flex items-end gap-2">
                                        <p className="text-2xl font-black">$ {product.finalPrice?.toLocaleString()}</p>
                                        <p className="text-sm text-green-400 font-bold">% {product.discountPercentage} Off</p>
                                    </div>
                                </div>

                            ) : (<p className="text-2xl font-black mt-4">$ {product.finalPrice?.toLocaleString()}</p>)}
                            <p className="text-sm text-neutral-400 mt-2 col-span-2">Stock restante: <span className="text-white">{product.quantityAvailable}</span></p>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                            <label className="font-bold">Cantidad:</label>
                            <input className="bg-neutral-600 flex w-8 aspect-square rounded-md text-center" value={quantity > product.quantityAvailable ? product.quantityAvailable : quantity < 1 ? 1 : quantity}  onChange={(e) => setQuantity(e.target.value)} type="number" min="1" max={product.quantityAvailable} placeholder="Cantidad"></input>
                        </div>
                        
                        <div className="flex h-16 gap-4 mt-4">

                            {!isAuth ?
                                <NavLink to="/registro" className="flex justify-center items-center h-full w-full rounded-xl bg-white py-2 px-4 text-black font-bold text-base">Registrate para comprar</NavLink>
                                :
                                <>
                                    <AddCartBtn product={{ id: product._id, quantity: quantity }} />
                                </>
                            }

                        </div>

                    </div>

                </div>
            </div>
        ) : (null)



    )
}