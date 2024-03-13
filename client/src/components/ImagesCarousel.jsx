import { useEffect, useState } from "react"

export default function ImagesCarousel(props) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { images,className } = props
    const moveCarousel = (direction) => {
        setCurrentIndex((prevIndex) => {
            if (direction === "left") {
                return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
            } else if (direction === "right") {
                return prevIndex === images.length - 1 ? 0 : prevIndex + 1;

            }
        })
    };

    return (
        images?.length > 1 ? (
            <div className={"flex flex-col lg:flex-row gap-2 flex-1 relative items-start"+className}>
                <div className="flex flex-row lg:flex-col gap-2 w-16 h-full max-lg:hidden">
                    {images.map((image, index) => (
                        <img onClick={() => setCurrentIndex(index)} className={`w-full h-max aspect-square bg-white rounded-md object-contain ${currentIndex === index ? 'opacity-100  ' : 'opacity-50'}`} src={image}></img>
                    ))}

                </div>
                <div className="flex justify-center items-center w-full relative overflow-hidden rounded-xl">
                    <div className="flex w-full transition-transform"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {images?.map((imageSrc, index) => (
                            <img
                                className="w-full min-w-full aspect-square object-contain bg-white"
                                key={index} src={imageSrc}></img>
                        ))}
                    </div>
                    <div className="w-full flex justify-center absolute z-10">
                        <div className="w-full px-4 flex justify-between">
                            <button className="rounded-full bg-[rgb(255,255,255,0.5)] backdrop-blur text-black w-8 h-8 border active:scale-90 hover:opacity-50" onClick={() => moveCarousel("left")}>L</button>
                            <button className="rounded-full bg-[rgb(255,255,255,0.5)] backdrop-blur text-black w-8 h-8 border active:scale-90 hover:opacity-50" onClick={() => moveCarousel("right")}>R</button>
                        </div>
                    </div>
                </div>


            </div>
        ) : (
            <img src={images?.[0]} className="flex-1  aspect-square object-contain bg-white rounded-xl"></img>
        )


    )
}