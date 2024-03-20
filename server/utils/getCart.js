const UserSchema = require("../models/userModel.js")
const ProductSchema = require("../models/productModel.js")

const getCart = async(id,req,res) =>{
    
        const user = await UserSchema.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
        }

        // Obtener los IDs de los productos en el carrito
        const productIds = user.cart.map(item => item.id);

        // Buscar detalles de productos usando los IDs
        const productsDetails = await ProductSchema.find({ _id: { $in: productIds } });

        // Filtrar el carrito del usuario para mantener solo los productos válidos
        const updatedCart = user.cart.filter(cartItem => {
            const isValidProduct = productsDetails.some(product => product._id.toString() === cartItem.id);
            return isValidProduct;
        });

        // Verificar si la cantidad de algún producto en el carrito supera la cantidad disponible
        updatedCart.forEach(cartItem => {
            const productDetail = productsDetails.find(product => product._id.toString() === cartItem.id);
            if (productDetail && cartItem.quantity > productDetail.quantityAvailable) {
                // Si la cantidad en el carrito es mayor que la cantidad disponible, ajustar la cantidad en el carrito
                cartItem.quantity = productDetail.quantityAvailable;
            }
        });

        const totalPrice = updatedCart.reduce((acc, cartItem) => {
            const productDetail = productsDetails.find(product => product._id.toString() === cartItem.id);
            if (productDetail) {
                acc += productDetail.price * cartItem.quantity;
            }
            return acc;
        }, 0);

        // Actualizar el carrito del usuario en la base de datos
        user.cart = updatedCart;
        await user.save();

        // Agregar detalles de productos al carrito del usuario
        const cartWithDetails = updatedCart.map(cartItem => {
            const productDetail = productsDetails.find(product => product._id.toString() === cartItem.id);
            return {
                id: cartItem.id,
                quantity: cartItem.quantity,
                productDetail: productDetail || null
            };
        });
        return { cartWithDetails: cartWithDetails, totalPrice: totalPrice };
}
module.exports = getCart
