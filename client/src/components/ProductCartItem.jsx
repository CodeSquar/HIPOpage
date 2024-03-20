import { useEffect, useContext } from "react"
import ApiServices from "../services/ApiServices"
import FetchClient from "../services/FerchClient"
import { UserContext } from "../providers/UserProvider";


export default function ProductCartItem(props) {
    const { token } = useContext(UserContext)
    const { name, finalPrice, imageSrc, quantity, id,style,setLoading } = props

    const handleFormSubmit = async () => {
        const apiServices = new ApiServices(FetchClient)
        try {
            const response = await apiServices.deleteCart(id, token);
            console.log(response);
            location.reload()
        } catch (err) {
            console.log("Error deleting cart product:", err);
        }
    }

    return (
        <div className="flex justify-between items-start bg-neutral-800 rounded-2xl py-4 px-4">
            <div className="flex items-start">
                <img className="w-8 sm:w-16 mr-4 aspect-square object-contain rounded-md bg-neutral-600 h-max" src={imageSrc}></img>
                <div>
                    <h3 className="font-normal text-white line-clamp-2">{name}</h3>
                    <p className="text-sm text-neutral-400 mt-1">Precio Unidad: <span className="font-bold text-white">$ {finalPrice.toLocaleString()}</span></p>
                    <p className="text-sm text-neutral-400 mt-1">Cantidad: <span className="font-bold text-white">{quantity}</span></p>
                </div>
            </div>
          
            <button onClick={() => { handleFormSubmit(); setLoading(true); }}>
                <svg width="24px"  viewBox="0 -5 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-518.000000, -1146.000000)" fill="#DE4E4E">
                            <path d="M540.647,1159.24 C541.039,1159.63 541.039,1160.27 540.647,1160.66 C540.257,1161.05 539.623,1161.05 539.232,1160.66 L536.993,1158.42 L534.725,1160.69 C534.331,1161.08 533.692,1161.08 533.298,1160.69 C532.904,1160.29 532.904,1159.65 533.298,1159.26 L535.566,1156.99 L533.327,1154.76 C532.936,1154.37 532.936,1153.73 533.327,1153.34 C533.718,1152.95 534.352,1152.95 534.742,1153.34 L536.981,1155.58 L539.281,1153.28 C539.676,1152.89 540.314,1152.89 540.708,1153.28 C541.103,1153.68 541.103,1154.31 540.708,1154.71 L538.408,1157.01 L540.647,1159.24 L540.647,1159.24 Z M545.996,1146 L528.051,1146 C527.771,1145.98 527.485,1146.07 527.271,1146.28 L518.285,1156.22 C518.074,1156.43 517.983,1156.71 517.998,1156.98 C517.983,1157.26 518.074,1157.54 518.285,1157.75 L527.271,1167.69 C527.467,1167.88 527.723,1167.98 527.979,1167.98 L527.979,1168 L545.996,1168 C548.207,1168 550,1166.21 550,1164 L550,1150 C550,1147.79 548.207,1146 545.996,1146 L545.996,1146 Z" id="delete" sketch:type="MSShapeGroup">
                            </path>
                        </g>
                    </g>
                </svg>
            </button>
        </div>

    )
}