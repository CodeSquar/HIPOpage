
export default function ProductCartItem(props){
    const {name,finalPrice,imageSrc,quantity} = props
    return(
        <div className="flex bg-neutral-800 rounded-md py-4 px-4">
            <img className="w-8 sm:w-16 mr-4 aspect-square object-contain rounded bg-neutral-600 h-max" src={imageSrc}></img>
            <div>
                <h3 className="font-normal text-white line-clamp-2">{name}</h3>
                <p className="text-sm text-neutral-400 mt-1">Precio Unidad: <span className="font-bold text-white">$ {finalPrice.toLocaleString()}</span></p>
                <p className="text-sm text-neutral-400 mt-1">Cantidad: <span className="font-bold text-white">{quantity}</span></p>
            </div>
           
        </div>
      
    )
}