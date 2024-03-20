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
const getCart = require("../utils/getCart.js")
router.post("/payment", userInfo, async (req, res) => {
  try {
  
    const body = req.body
    const { cartWithDetails, totalPrice } = await getCart(body.userId);

    const finalCartItems = cartWithDetails?.map(item => ({
      id: item.id,
      title: item.productDetail.name,
      description: item.productDetail.description,
      picture_url: item?.productDetail.images[0],
      category_id: item.productDetail.category,
      quantity: item.quantity,
      currency_id: 'ARS',
      unit_price: item.productDetail.finalPrice,
    }));
  /*  console.log(finalCartItems)*/
    // Construir los datos para la solicitud a Mercado Pago usando la información del producto
    const data = {
      back_urls: {
        success: success_url,
        failure: failed_url,
        pending: pending_url
      },
      shipments: {
        receiver_address: {
          zip_code: body.zipCode,
          state_name: body.state,
          city_name: body.city,
          street_name: body.streetName,
          street_number: body.streetNumber
        },
        "width": null,
        "height": null
      },
      notification_url: "https://qq06pqjf-5000.brs.devtunnels.ms/api/notification",
      auto_return: "approved",
      items:finalCartItems,
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
