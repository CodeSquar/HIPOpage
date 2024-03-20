import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../providers/UserProvider";
import ApiServices from "../../services/ApiServices"
import FetchClient from "../../services/FerchClient"
import LoadingAnimation from "../../components/LoadingAnimation";

export default function AdminPost(params) {
    const { token } = useContext(UserContext)
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [quantityAvailable, setQuantityAvailable] = useState("");
    const [weight, setWeight] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [category, setCategory] = useState("");

    //form states
    const [uncompleteFields, setUncompleteFields] = useState(false)
    const [success, setSuccess] = useState(undefined)

    const handleFormSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (!name || !description || !quantityAvailable) {
            setLoading(false)
            return setUncompleteFields(true)
        }
        const body = { name, price, description, images, quantityAvailable, weight, discountPercentage, category }
        const apiServices = new ApiServices(FetchClient)
        try {
            const response = await apiServices.postProduct(body, token);
            setSuccess(true)

        } catch (err) {
            console.log("Error adding product:", err);
        }
        setLoading(false)
    };

    return (
        <div className="w-full flex justify-center px-6">
            <div className="mt-8 max-w-[1000px] w-full mb-16">
                <h2 className="font-black text-2xl">Añadir producto</h2>
                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 [&>div>label]:flex  [&>div>label]:font-bold [&>div>input]:flex [&>div>input]:w-full [&>div>input]:bg-transparent [&>div>input]:mt-2  [&>div>input]:outline-none [&>div>input]:border-b [&>div>input]:border-b-neutral-400"
                    onSubmit={handleFormSubmit}
                >
                    <div>
                        <label htmlFor="">Nombre del producto: {uncompleteFields && <span className="text-red-500 ml-4">Este campo es obligatorio!</span>}</label>
                        <input
                            className=""
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>


                    <div>
                        <label className="" htmlFor="">Precio: {uncompleteFields && <span className="text-red-500 ml-4">Este campo es obligatorio!</span>}</label>
                        <input
                            className=""
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="" htmlFor="">
                            Descripcion: {uncompleteFields && <span className="text-red-500 ml-4">Este campo es obligatorio!</span>}
                        </label>
                        <input
                            className=""
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="" htmlFor="">
                            Imágenes (separadas por comas): {uncompleteFields && <span className="text-red-500 ml-4">Este campo es obligatorio!</span>}
                        </label>
                        <input
                            className=""
                            value={images}
                            onChange={(e) => setImages(e.target.value.split(","))}
                        />
                    </div>
                    <div>
                        <label className="" htmlFor="">
                            Cantidad disponible: {uncompleteFields && <span className="text-red-500 ml-4">Este campo es obligatorio!</span>}
                        </label>
                        <input
                            className=""
                            value={quantityAvailable}
                            onChange={(e) => setQuantityAvailable(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="" htmlFor="">
                            Peso:
                        </label>
                        <input
                            className=""
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="" htmlFor="">
                            Descuento (%):  {discountPercentage && <span className="font-bold text-cyan-600"> Precio con descuento: ${price - price * (discountPercentage / 100)}</span>}
                        </label>
                        <input
                            className=""
                            value={discountPercentage}
                            onChange={(e) => setDiscountPercentage(e.target.value)}
                        />
                    </div>
                   <div>
                    <label className="" htmlFor="">
                            Categoria (selecciona una existente o agrega una nueva): {uncompleteFields && <span className="text-red-500 ml-4">Este campo es obligatorio!</span>}
                        </label>
                        <input
                            className=""
                            type="text"
                            list="categories"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                         <datalist id="categories">
                            <option value="perros"></option>
                            <option value="gatos"></option>
                            <option value="alimentos"></option>
                        </datalist>
                   </div>
                    <button
                        className="col-span-2 font-black flex justify-center w-full text-white bg-cyan-600 rounded-2xl py-6 px-10 uppercase"
                        type="submit"
                    >
                        {loading ? <LoadingAnimation /> : " AÑADIR +"}

                    </button>

                </form>
            </div>
        </div>

    );
}
