import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../providers/UserProvider";
export default function AdminPost(params) {
    const { token } = useContext(UserContext)
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [quantityAvailable, setQuantityAvailable] = useState("");
    const [weight, setWeight] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [category, setCategory] = useState("");

    //form states
    const [uncompleteFields,setUncompleteFields] = useState(false)
    const [success, setSuccess] = useState(undefined)

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !quantityAvailable){
            return setUncompleteFields(true)
        }

        try {
            const response = await axios.post("http://localhost:5000/api/products", {
                name,
                price,
                description,
                images,
                quantityAvailable,
                weight,
                discountPercentage,
                category,
            }, {
                headers: {
                    Authorization: token
                }
            });

            // Handle the response as needed, e.g., show success message, redirect, etc.
            console.log(response);
            setSuccess(true)
        } catch (err) {
            // Handle errors, e.g., show error message to the user
            console.log("Error adding product:", err);
        }
    };

    return (
        <div className="mx-6 mt-8">
            <h2 className="font-black text-2xl">Añadir producto</h2>
            <form
                className="mt-6 [&>label]:flex [&>input]:flex [&>input]:w-full [&>input]:bg-transparent [&>input]:mt-2 [&>input]:outline-none [&>input]:border-b [&>input]:border-b-neutral-400"
                onSubmit={handleFormSubmit}
            >
                <label htmlFor="">Nombre del producto: {uncompleteFields && <span className="text-red-500 ml-4">Este campo es obligatorio!</span>}</label>
                <input
                    className=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="mt-4" htmlFor="">Precio: {uncompleteFields && <span className="text-red-500 ml-4">Este campo es obligatorio!</span>}</label>
                <input
                    className=""
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label className="mt-4" htmlFor="">
                    Descripcion: {uncompleteFields && <span className="text-red-500 ml-4">Este campo es obligatorio!</span>}
                </label>
                <input
                    className=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label className="mt-4" htmlFor="">
                    Imágenes (separadas por comas): {uncompleteFields && <span className="text-red-500 ml-4">Este campo es obligatorio!</span>}
                </label>
                <input
                    className=""
                    value={images}
                    onChange={(e) => setImages(e.target.value.split(","))}
                />
                <label className="mt-4" htmlFor="">
                    Cantidad disponible: {uncompleteFields && <span className="text-red-500 ml-4">Este campo es obligatorio!</span>}
                </label>
                <input
                    className=""
                    value={quantityAvailable}
                    onChange={(e) => setQuantityAvailable(e.target.value)}
                />
                <label className="mt-4" htmlFor="">
                    Peso:
                </label>
                <input
                    className=""
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <label className="mt-4" htmlFor="">
                    Descuento (%): 
                </label>
                <input
                    className=""
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                />
                <label className="mt-4" htmlFor="">
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
            
                <button
                    className="font-black flex justify-center w-full text-white bg-cyan-600 rounded-2xl py-6 px-10 mt-4 uppercase"
                    type="submit"
                >
                    AÑADIR +
                </button>

            </form>
        </div>
    );
}
