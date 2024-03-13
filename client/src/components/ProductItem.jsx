import {NavLink} from "react-router-dom"

export default function ProductItem(props) {
    const { name, images, price, finalPrice, discountPercentage, to ,index, style } = props
    return (
        <NavLink to={to} key={index} style={style} className={`border-b pb-5 border-neutral-600 z-30`}>
            <img className="aspect-[3/4] object-cover w-full rounded-xl" src={images[0]}></img>
            {discountPercentage ? (
                <>
                    <p className="line-through text-neutral-400 mt-2">$ {price.toLocaleString()}</p>
                    <div className="flex flex-col items-start lg:flex-row lg:items-end gap-2 font-medium text-sm ">
                        <p className="font-black text-xl md:text-2xl text-neutral-200">$ {finalPrice.toLocaleString()}</p>
                        <p className="text-green-400">-{discountPercentage}% off</p>
                    </div>
                </>
            ) : (
                <p className="font-black text-2xl text-neutral-200 mt-2">$ {price.toLocaleString()}</p>
            )}
            <h3 className="uppercase font-normal text-white mt-2 line-clamp-2">{name}</h3>

        </NavLink>
    )
}