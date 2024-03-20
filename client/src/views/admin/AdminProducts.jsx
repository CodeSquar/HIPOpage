import { useEffect, useState } from "react"
import ApiServices from "../../services/ApiServices"
import FetchClient from "../../services/FerchClient"
import AdminProductItem from "./adminComponents/AdminProductItem"

export default function AdminProducts(params) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const apiServices = new ApiServices(FetchClient)
        const getProducts = async () => {
            try {
                const res = await apiServices.getProducts()
                console.log(res.products.docs)
                setProducts(res.products.docs)
            } catch (error) {
                console.log(err)
            }
        }
        getProducts()
    }, [])
    return (
        <div className="flex w-full justify-center px-6">
            <div className="max-w-[1000px] w-full mx-auto mt-8">
                <h2 className="font-black text-2xl">Productos</h2>
                <div className="mt-8 w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products?.map((product) => (
                        <AdminProductItem productInfo={product} products={products} setProducts={setProducts} />
                    ))}
                </div>
            </div>
        </div>



    )
}