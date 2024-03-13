import { useEffect, useState } from "react"
import axios from "axios"
import ProductItem from "./ProductItem"
import { useSearchParams } from "react-router-dom"

function Filter(props) {
    const [filterActive, setFilterActive] = useState(false)

    const { title, children, options } = props
    return (
        <div className="relative">
            <button onClick={() => setFilterActive(!filterActive)} className="font-bold text-sm  ">{title}
              
            </button>
            {filterActive &&
                    <>
                        <ul className="p-6 absolute bg-neutral-800 border border-neutral-700 rounded-xl z-40 w-64">
                            {options?.map((option) => (
                                <>
                                    <li>{option}</li>

                                </>
                            ))}
                            {children}
                        </ul>
                    </>}
        </div>



    )
}
export default function ProductsList(props) {
    const { extended } = props
    const [searchParams, setSearchParams] = useSearchParams()
    const precioInicial = searchParams.get("minPrice") || ""
    const precioFinal = searchParams.get("maxPrice") || ""
    const [products, setProducts] = useState([])


    const productsInRange = ((precioInicial >= 0 || precioFinal >= 0) && (products?.length > 0))
    console.log(precioInicial, productsInRange)
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products?minPrice=${precioInicial}&maxPrice=${precioFinal}`)
                setProducts(res.data.products.docs)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [precioInicial, precioFinal])

    return (

        <>


            <div className="flex items-left gap-8 text-sm w-full mt-8 py-4 px-8 bg-neutral-800 rounded-xl" >

                <Filter title="Precio">
                    <>
                        <input
                            value={precioInicial}
                            onChange={(e) => {
                                searchParams.set("minPrice", e.target.value)
                                setSearchParams(e.target.value > 0 && searchParams)
                            }}
                            type="number"
                            className="flex bg-neutral-700 px-4 py-2 rounded-md w-full focus:bg-neutral-600 outline-transparent"
                            placeholder="minimo"></input>
                        <input
                            value={precioFinal}
                            onChange={(e) => {
                                searchParams.set("maxPrice", e.target.value)
                                setSearchParams(searchParams)
                            }}
                            type="number"
                            className="flex bg-neutral-700 px-4 py-2 rounded-md w-full mt-2 focus:bg-neutral-600 outline-transparent"
                            placeholder="maximo">
                        </input>
                    </>
                </Filter>
                <Filter title="Otro filtro" options={["opcion 1","opcion 2"]}>   </Filter>
                <Filter title="Otro filtro 2" options={["opcion 1","opcion 2"]}>   </Filter>
             
            </div>


            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-8">
                {!productsInRange && (
                    <p className="font-bold text-red-400 col-span-3  p-8">No se encontraron productos en ese rango de precios</p>
                )}
                {products?.map((product, index) => (
                    <ProductItem
                        to={product._id}
                        index={index}
                        name={product.name}
                        price={product.price}
                        finalPrice={product.finalPrice}
                        discountPercentage={product.discountPercentage}
                        images={product.images}
                    />
                ))}
            </div>
        </>
    )
}