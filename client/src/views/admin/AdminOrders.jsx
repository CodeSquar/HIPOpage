import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserContext } from "../../providers/UserProvider"
import ApiServices from "../../services/ApiServices"
import FetchClient from "../../services/FerchClient"

export default function AdminOrders(params) {
    const { token } = useContext(UserContext)
    const [sales, setSales] = useState({})
    useEffect(() => {
        const apiServices = new ApiServices(FetchClient)
        const getSales = async () => {
            try {
                const res = await apiServices.getSales(token)
                setSales(res)
            } catch (err) {
                console.log(err)
            }
        }
        getSales()
    }, [])
    return (

        <div className="px-6">
            <div className="w-full bg-white mt-8 rounded-xl p-16">
                <table className="w-full">

                    <thead className="">
                        <tr className="[&>th]:text-left">
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    {sales?.sales?.map((sale) => (

                        sale.products.map((item) => (
                            <tr>
                              
                                <td className="flex"><img className="w-8" src={item.images[0]}></img>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.finalPrice}</td>
                                <td>{item.finalPrice * item.quantity}</td>
                            </tr>
                        ))
                    ))}
                </table>
            </div>

        </div>
    )
}