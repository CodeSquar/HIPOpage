import { useSearchParams } from "react-router-dom"
export default function Success(params) {
    const [searchParams, setSearchParams] = useSearchParams();
    const collection_id = searchParams.get("collection_id")
    const status = searchParams.get("status")
    const payment_id = searchParams.get("payment_id")
    return(
        <div className="flex w-full justify-center  text-center mt-8 ">
            <div className="bg-neutral-800 w-max p-8 rounded">
                <h2 className="text-2xl font-bold text-green-400">Compra realizada con exito!</h2>
                <ul className="mt-4 space-y-2">
                    <li className="text-sm text-neutral-400">collection id = {collection_id}</li>
                    <li className="text-sm text-neutral-400">payment status = {status}</li>
                    <li className="text-sm text-neutral-400">payment id = {payment_id}</li>
                </ul>
            </div>
           
        </div>
       
    )
}