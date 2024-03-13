import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserContext } from "../../providers/UserProvider"

export default function AdminOrders(params) {
    const {token} = useContext(UserContext)
    const [sales, setSales] = useState({})
    useEffect(() => {
        const getSales = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/sales",{
                    headers:{
                        Authorization: token
                    }
                })
                console.log(res.data)
                setSales(res.data)
            } catch (err) {

            }
        }
        getSales()
    }, [])
    return (
        <div className="px-6 ">
            <h2 className="font-black mt-12 text-2xl">Pedidos</h2>
            <div className="space-y-6 mt-8">
                {sales?.sales?.map((sale, index) => (
                    <div className="">
                        <h2 className="font-bold">Pedido {sale.mpId}</h2>
                        {sale.products.map((item) => (
                            <div className="bg-white p-4 rounded-lg mt-4">
                                <p>{item.name} x1</p>
                              
                            </div>

                        ))}
                    <p className=" mt-2">Ubicacion de envio: <span className="font-bold">{sale.state_name}, {sale.city_name}, {sale.street_name}, {sale.street_number}</span></p>
                    </div>

                ))}
            </div>

        </div>
    )
}