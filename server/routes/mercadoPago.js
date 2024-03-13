const axios = require('axios');
const express = require("express");
const { Router } = require("express");
const router = Router();
router.use(express.json());
const userInfo = require("../middlewares/userInfo")
// Importar el modelo de producto
const ProductSchema = require("../models/productModel");
const access_token = "APP_USR-6623054747559974-111505-d441fefdfbc445cd599bf3524547ceb9-1548537551"
const success_url = "http://localhost:5173/success"
const failed_url = "http://localhost:5173/failed"
const pending_url = "http://localhost:5173/pending"

router.post("/payment", userInfo, async (req, res) => {
  try {
    const products = req.body.products
    const { zipCode, state, city, streetName, streetNumber } = req.body;

    for (const productInfo of products) {
      const { id, quantity } = productInfo;
    
      // Verificar si el ID del producto fue proporcionado
      if (!id) {
        return res.status(400).json({ error: "ID del producto no proporcionado" });
      }
    
      // Buscar el producto en la base de datos usando el ID
      const product = await ProductSchema.findById(id);
    
      // Verificar si el producto existe
      if (!product) {
        return res.status(404).json({ error: `Producto con ID ${id} no encontrado` });
      }
    
      // Verificar si hay suficiente stock
      if (product.stock < quantity) {
        return res.status(400).json({ error: `No hay suficiente stock para el producto con ID ${id}` });
      }}

    // Construir los datos para la solicitud a Mercado Pago usando la información del producto
    const data = {
      back_urls: {
        success: success_url,
        failure: failed_url,
        pending: pending_url
      },
      shipments: {
        receiver_address: {
          zip_code: zipCode,
          state_name: state,
          city_name: city,
          street_name: streetName,
          street_number: streetNumber
        },
        "width": null,
        "height": null
      },
      notification_url: "https://e769-45-225-212-142.ngrok-free.app/api/notification",
      auto_return: "approved",
      items: [
        {
          id: product._id,
          title: product.name,
          description: product.description,
          picture_url: product.images[0],
          category_id: product.category,
          quantity: quantity,
          currency_id: 'ARS',
          unit_price: product.finalPrice,
        },
      ],
      payer: {
        address: { street_number: 1234 },
      },
    };

    // Realizar la solicitud a Mercado Pago
    const response = await axios.post('https://api.mercadopago.com/checkout/preferences', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log('Respuesta de Mercado Pago:', response.data);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
