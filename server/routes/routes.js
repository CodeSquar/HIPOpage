const { Router } = require("express")
const router = Router()
const ProductSchema = require("../models/productModel.js")
const UserSchema = require("../models/userModel.js")
const SalesSchema = require("../models/salesModel.js")
const userInfo = require("../middlewares/userInfo.js")
const adminCheck = require("../middlewares/adminCheck.js")
const axios = require("axios")
router.post("/products", adminCheck, async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            category,
            images,
            quantityAvailable,
            weight,
            discountPercentage

        } = req.body

        const existingProduct = await ProductSchema.findOne({ name });

        if (existingProduct) {
            return res.status(400).json({ error: "Ya existe un producto con este mismo nombre en la base de datos." });
        }
        const finalPrice = price - (discountPercentage / 100) * price
        const product = new ProductSchema({
            name,
            price,
            description,
            category,
            images,
            quantityAvailable,
            weight,
            discountPercentage,
            finalPrice
        })

        await product.save()
        res.status(201).json(product);
    }

    catch (err) {
        res.send(err);
    }
})

router.get("/products", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 25;
        const page = parseInt(req.query.page) || 1;
        const minPrice = parseInt(req.query.minPrice) || 0; // Valor mínimo del precio
        const maxPrice = parseInt(req.query.maxPrice) || Number.MAX_SAFE_INTEGER; // Valor máximo del precio
        /*const orderby = req.query.orderby || 'mostrecent';*/

        const products = await ProductSchema.paginate({
            finalPrice: { $gte: minPrice, $lte: maxPrice }
        },
            {
                limit,
                page
            }
        )
        if (!products) {
            return res.status(404).json({ message: "products not found" })
        }
        res.send({ products });
    } catch (err) {
        res.send(err.message);
    }
})

router.get("/products/:id", async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado." })
        }
        res.send(product)
    } catch (err) {
        res.send(err.message);
    }
})
router.post("/cart", userInfo, async (req, res) => {
    try {
        const { id } = req.userInfo;
        const { productInfo } = req.body;

        if (parseInt(productInfo.quantity) < 1) {
            console.log(productInfo.quantity + "es menor que uno!")
            return res.status(400).json({ success: false, message: 'La cantidad del producto no puede ser menor que 1.' });
        }
        // Buscar el documento del usuario en la base de datos utilizando el ID
        const userDocument = await UserSchema.findById(id);

        if (!userDocument) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
        }

        // Obtener el producto por su ID
        const product = await ProductSchema.findById(productInfo.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado.' });
        }

        // Verificar si el producto ya está en el carrito del usuario
        const existingProductIndex = userDocument.cart.findIndex(item => item.id === productInfo.id);

        // Calcular la cantidad total del producto en el carrito (incluyendo la nueva cantidad)

        let totalQuantity = parseInt(productInfo.quantity) || 1;
        if (existingProductIndex !== -1) {
            const existingQuantity = parseInt(userDocument.cart[existingProductIndex].quantity);
            totalQuantity += existingQuantity;
        }

        // Verificar si la cantidad solicitada supera el stock disponible
        if (totalQuantity > product.quantityAvailable) {
            console.log(totalQuantity +" Se excede a "+product.quantityAvailable)
            return res.status(400).json({ success: false, message: 'La cantidad solicitada excede el stock disponible.' });
     
        }

        // Si la cantidad está dentro del stock disponible, proceder a agregar el producto al carrito
        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, aumentar su cantidad
            const existingQuantity = parseInt(userDocument.cart[existingProductIndex].quantity);
            userDocument.cart[existingProductIndex].quantity = existingQuantity + parseInt(productInfo.quantity);
        } else {
            // Si el producto no está en el carrito, agregarlo
            userDocument.cart.push(productInfo);
        }

        // Guardar los cambios en la base de datos
        await userDocument.save();

        res.status(200).json({ success: true, message: 'Producto agregado al carrito correctamente.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error al agregar el producto.', err });
    }
});
router.get("/cart", userInfo, async (req, res) => {
    const { id } = req.userInfo;

    try {
        // Buscar al usuario en la base de datos utilizando el _id
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

        // Devolver el carrito con detalles de productos en la respuesta
        res.status(200).json({ cartWithDetails, totalPrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
});
router.delete("/cart/:productId", userInfo, async (req, res) => {
    try {
        const { id } = req.userInfo;
        const productId = req.params.productId;

        // Buscar el documento del usuario en la base de datos utilizando el ID
        const userDocument = await UserSchema.findById(id);

        if (!userDocument) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
        }

        // Verificar si el producto está en el carrito del usuario
        const productIndex = userDocument.cart.findIndex(item => item.id === productId);

        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado en el carrito.' });
        }

        // Eliminar el producto del carrito
        userDocument.cart.splice(productIndex, 1);

        // Guardar los cambios en la base de datos
        await userDocument.save();

        res.status(200).json({ success: true, message: 'Producto eliminado del carrito correctamente.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error al eliminar el producto del carrito.', err });
    }
});
router.get("/users", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 25;
        const page = parseInt(req.query.page) || 1;


        const users = await UserSchema.paginate(
            {
                limit,
                page
            }
        )
        if (!users) {
            return res.status(404).json({ message: "users not found" })
        }
        res.send(users);
    } catch (err) {
        res.send(err.message);
    }
})
router.get("/sales", adminCheck, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 25;
        const page = parseInt(req.query.page) || 1;

        const sales = await SalesSchema.paginate({}, { limit, page });

        if (!sales) {
            return res.status(404).json({ message: "sales not found" });
        }

        // Obtener detalles de productos para cada venta
        const salesWithProducts = await Promise.all(
            sales.docs.map(async (sale) => {
                try {
                    // Hacer una solicitud a la API de Mercado Pago para obtener detalles de la venta
                    const response = await axios.get(`https://api.mercadopago.com/v1/payments/${sale.mpId}`, {
                        headers: {
                            Authorization: 'Bearer APP_USR-6623054747559974-111505-d441fefdfbc445cd599bf3524547ceb9-1548537551', // Reemplaza con tu token de acceso de Mercado Pago
                        },
                    });


                    const shippingInfo = response.data.additional_info.shipments.receiver_address
                    // Obtener los IDs de los productos de la venta desde items.id
                    const productIds = response.data.additional_info.items.map((item) => item.id);

                    // Buscar detalles de productos en ProductSchema usando los IDs
                    const productsDetails = await ProductSchema.find({ _id: { $in: productIds } });

                    // Retornar la venta con detalles de productos
                    return {
                        ...sale.toObject(),
                        products: productsDetails,
                        city_name: shippingInfo.city_name,
                        state_name: shippingInfo.state_name,
                        street_name: shippingInfo.street_name,
                        street_number: shippingInfo.street_number,
                        zip_code: shippingInfo.zip_code
                    };
                } catch (error) {
                    console.error('Error al obtener detalles de productos para la venta:', error);
                    return sale.toObject(); // En caso de error, solo retornar la venta sin detalles de productos
                }
            })
        );

        res.status(200).json({ sales: salesWithProducts });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/notification", async (req, res) => {
    try {
        if (req.query.topic === "payment") {
            const sale = new SalesSchema({
                mpId: req.query.id,
                state: "accredited"

            });
            await sale.save();

            res.status(201).json(sale);
        }
    }
    catch (error) {
        console.error('Error al procesar la notificación:', error);
        res.status(500).json({ error: 'Error interno al procesar la notificación.' });
    }
})
module.exports = router