import { NavLink } from "react-router-dom"
import ProductsList from "../components/ProductsList"
import ProductsCarousel from "../components/ProductsCarousel"
export default function Home(params) {
    return (
<>
                <div className="flex gap-4 mt-8">
                    <div className="flex-1">
                        <h1 className="text-8xl uppercase font-black ">Hipo</h1>
                        <div className="h-[2px] w-[100px] bg-white"></div>
                        <h2 className="text-base font-bold">Accesorios para mascotas.</h2>
                        <p className="font-medium text-neutral-400 mt-4 ">"Hipo" es una tienda especializada en la que puedes encontrar una amplia variedad de accesorios y productos para tus queridas mascotas y mucho más.
                        </p>
                        <button className="text-sm font-bold bg-white text-black px-4 py-2 rounded mt-8 w-full sm:w-max">ver productos</button>
                    </div>
                    <div className="hidden lg:flex flex-col justify-center items-end flex-1 ">
                        <img src="/home-image.png"></img>
                        <NavLink className="w-max" to="/productos">Ver todos los productos</NavLink>
                    </div>
                </div>
                <ProductsCarousel />
                </>


    )
}