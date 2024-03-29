import { useState, useEffect, useRef } from "react"
import { NavLink } from "react-router-dom"
import ProductItem from "./ProductItem"
import ApiServices from "../services/ApiServices"
import FetchClient from "../services/FerchClient"
import { useSpring, animated } from '@react-spring/web'
import LoadingAnimation from "./LoadingAnimation"

export default function ProductsCarousel() {

    const [products, setProducts] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState({})
    //variables of carousel
    const [carouselWidth, setCarouselWidth] = useState(Number)
    const [innerCarouselWidth, setInnerCarouselWidth] = useState(Number)

    const carouselRef = useRef(null);
    const innerCarouselRef = useRef(null);
    const gap = 16

    let numberOfItems = 4

    const carouselAvalible = carouselWidth < innerCarouselWidth
    console.log(carouselAvalible)
    if (carouselWidth <= 960 && carouselWidth >= 640) {
        numberOfItems = 3;
    } else if (carouselWidth <= 640 /* && carouselWidth >= 425*/) {
        numberOfItems = 2;
    } /*else if (carouselWidth <= 425) {
        numberOfItems = 1;
    }*/
    const itemWidth = (carouselWidth - (gap * (numberOfItems - 1))) / numberOfItems;

    useEffect(() => {
        const handleResize = () => {
            if (carouselRef.current) {
                setCarouselWidth(carouselRef.current.offsetWidth);
                setInnerCarouselWidth(innerCarouselRef.current.offsetWidth)
            }
            setCurrentIndex(0)
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    //get products
    useEffect(() => {
        const apiServices = new ApiServices(FetchClient)
        const getProducts = async () => {
            setLoading(true)
            setError(false)
            try {
                const res = await apiServices.getProducts()
                setProducts(res.products.docs)
                if (carouselRef.current) {
                    setCarouselWidth(carouselRef.current.offsetWidth);
                    setInnerCarouselWidth(innerCarouselRef.current.offsetWidth);
                }
            } catch (err) {
                console.log(err)
                setError(true)
                setErrorMessage(err.message)

            }
            setLoading(false)
        }
        getProducts()
    }, [])

    //function to move carousel
    const moveCarousel = (direction) => {

        setCurrentIndex((prevIndex) => {
            if (direction === "left") {
                return prevIndex === 0 ? products.length - numberOfItems : prevIndex - 1;
            } else if (direction === "right") {
                return prevIndex === products.length - numberOfItems ? 0 : prevIndex + 1;

            }
        })

    };
    //transition code
    const springs = useSpring({
        from: { opacity: 0, y: 100 },
        to: { opacity: 1, y: 0 },
    })

    return (
        <>
       
            <>
                <h2 className="font-bold text-neutral-400 mt-8">Productos: <NavLink to="/productos" className="text-amber-600">(Ver todos)</NavLink></h2>
                {loading && <LoadingAnimation className="mt-4"/>}
                <div className="flex w-full mt-4 relative items-center ">
                    {error && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                 
                    <animated.div style={{ ...springs }} id="carousel" ref={carouselRef} className="flex w-full overflow-hidden ">
                        <div
                            ref={innerCarouselRef}
                            style={{
                                transform: `translateX(-${currentIndex > 0 ? (currentIndex * (itemWidth + gap)) : (currentIndex * itemWidth)}px)`,
                                gap: gap,
                            }}
                            className="flex transition-transform ">
                           
                            {products?.map((product, index) => (
                                <ProductItem
                                    style={{ width: itemWidth }}
                                    to={"productos/" + product._id}
                                    key={index}
                                    name={product.name}
                                    price={product.price}
                                    finalPrice={product.finalPrice}
                                    discountPercentage={product.discountPercentage}
                                    images={product.images}
                                />
    
                            ))}
    
                        </div>
                    </animated.div>
                    {carouselAvalible && (
                        <div className="w-full flex justify-center absolute pointer-events-none">
                            <div className="w-[calc(100%+16px*2)] min-w-[calc(100%+16px*2)] flex justify-between">
                                <button className="flex items-center justify-center rounded-full bg-white text-black w-8 h-8 border z-20 pointer-events-auto" onClick={() => moveCarousel("left")}>
                                    <img className="h-4 rotate-180" src="/right.svg"></img>
                                </button>
                                <button className="flex items-center justify-center rounded-full bg-white text-black w-8 h-8 border z-20 pointer-events-auto" onClick={() => moveCarousel("right")}>
                                    <img className="h-4" src="/right.svg"></img>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </>
        </>
           
    );
}